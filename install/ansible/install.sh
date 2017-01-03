# Scheduler provider can be in kubernetes or swarm mode
scheduler_provider=${CONTIV_SCHEDULER_PROVIDER:-"native-swarm"}
export ANSIBLE_HOST_KEY_CHECKING=False
# Docker swarm specific API server parameters(s)
swarm_end_point=""
swarm_tls_ca=""
swarm_tls_cert=""
swarm_tls_key=""

# If an etcd or consul cluster store is not provided, we will start an etcd instance
cluster_store=""

# Contiv configuration can be specified through a config file and/or parameters
contiv_config=""
netmaster=""
network_mode="Standalone"
fwd_mode="bridge"
ans_opts="--private-key /contiv/config/insecure_private_key -u vagrant"
install_scheduler=False

function usage {
  echo "Usage:"
  echo "./install.sh -s <scheduler provider> -c <cluster store> -f <contiv config file> -n <netmaster IP> -m <network mode> -w <fwd mode> -a <ansible options> -t <tls cert> -k <tls key> -i <install the scheduler stack>"
  exit 1
}

function error_ret {
  echo ""
  echo $1
  exit 1
}

while getopts ":s:c:f:n:m:w:a:t:k:ei" opt; do
    case $opt in
       s)
          scheduler_provider=$OPTARG
          ;;
       c)
          cluster_store=$OPTARG
          ;;
       f)
          contiv_config=$OPTARG
          ;;
       n)
          netmaster=$OPTARG
          ;;
       m)
          network_mode=$OPTARG
          ;;
       w)
          fwd_mode=$OPTARG
          ;;
       w)
          ans_opts=$OPTARG
          ;;
       e)
          env_opts=""
          ;;
       t)
          tls_cert=$OPTARG
          ;;
       k)
          tls_key=$OPTARG
          ;;
       i)
          install_scheduler=True
          ;;
       :)
          echo "An argument required for $OPTARG was not passed"
          usage
          ;;
       ?)
          usage
          ;;
     esac
done

if [ "$netmaster" = "" ]; then
  usage
fi

if [ "$contiv_config" = "" ]; then
  usage
fi

echo "Generating Ansible configuration"
inventory=".gen"
mkdir -p $inventory
host_inventory="$inventory/contiv_hosts"
node_info="$inventory/contiv_nodes"

./genInventoryFile.py $contiv_config $host_inventory $node_info $network_mode $fwd_mode

echo "Installing Cisco Universal Container Networking using"
ansible_path=./ansible
env_file=install/ansible/env.json

sed -i.bak "s/__NETMASTER_IP__/$netmaster/g" $env_file

# Always install the base, install the scheduler stack/etcd if required
ansible-playbook $ans_opts -i $host_inventory -e "`cat $env_file`" $ansible_path/install_base.yml
if [ $install_scheduler = True ];then
  ansible-playbook $ans_opts -i $host_inventory -e "`cat $env_file`" $ansible_path/install_docker.yml
  ansible-playbook $ans_opts -i $host_inventory -e "`cat $env_file`" $ansible_path/install_etcd.yml
  ansible-playbook $ans_opts -i $host_inventory -e "`cat $env_file`" $ansible_path/install_scheduler.yml
else
  if [ "$cluster_store" = "" ];then
    ansible-playbook $ans_opts -i $host_inventory -e "`cat $env_file`" $ansible_path/install_etcd.yml
  fi
fi
# Install contiv & API Proxy
ansible-playbook $ans_opts -i $host_inventory -e "`cat $env_file`" $ansible_path/install_contiv.yml


cert_path=/var/contiv/certs
mkdir -p $cert_path
if [ "$tls_cert" = "" ]; then
  tls_cert=$cert_path/ucn_cert.pem
  tls_key=$cert_path/ucn_key.pem
  echo "Generating local certs for UCN Proxy"
  openssl genrsa -out $tls_key 2048 >/dev/null 2>&1
  openssl req -new -x509 -sha256 -days 3650 \
        -key $tls_key \
        -out $tls_cert \
        -subj "/C=US/ST=CA/L=San Jose/O=CPSG/OU=IT Department/CN=ccn-local.cisco.com"
else
  cp $tls_cert $cert_path/ucn_cert.pem
  cp $tls_key $cert_path/ucn_key.pem
fi
ansible-playbook $ans_opts -i $host_inventory -e "`cat $env_file`" $ansible_path/install_ucn.yml --extra-vars "cluster_store=etcd://$netmaster:2379"
