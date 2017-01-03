#
# The following parameters are user defined - and vary for each installation
#

# If an etcd or consul cluster store is not provided, we will start an etcd instance
cluster_store=""

# Netmaster address
netmaster=""

vlan_if=""

# Contiv configuration can be specified through a config file and/or parameters
contiv_config=""

# Specify TLS certs to be used for API server
tls_certs=""

function usage {
  echo "Usage:"
  echo "./install.sh -s <cluster store> -n <netmaster IP> -v <vlan interface> -c <contiv config> -t <tls cert> -k <tls key> "
  exit 1
}

function error_ret {
  echo ""
  echo $1
  exit 1
}

while getopts ":s:n:v:c:t:k:" opt; do
    case $opt in
       s)
          cluster_store=$OPTARG
          ;;
       n)
          netmaster=$OPTARG
          ;;
       v)
          vlan_if=$OPTARG
          ;;
       c)
          contiv_config=$OPTARG
          ;;
       t)
          tls_cert=$OPTARG
          ;;
       k)
          tls_key=$OPTARG
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

# Add other param validation

echo "Installing Cisco Universal Container Networking for Kubernetes\n"
# Cleanup any older config files
contiv_yaml="./.contiv.yaml"
rm -f $contiv_yaml

# Create the new config file from the templates
contiv_config_yaml_template="./install/k8s/contiv_config.yaml"
contiv_yaml_template="./install/k8s/contiv.yaml"
contiv_etcd_template="./install/k8s/etcd.yaml"
contiv_ucn_proxy_template="./install/k8s/ucn_proxy.yaml"

cat $contiv_config_yaml_template >> $contiv_yaml
if [ "$cluster_store" = "" ]; then
  cat $contiv_etcd_template >> $contiv_yaml
fi

cat $contiv_yaml_template >> $contiv_yaml

cat $contiv_ucn_proxy_template >> $contiv_yaml

if [ "$tls_cert" = "" ]; then
  echo "Generating local certs for UCN Proxy"
  mkdir -p /var/contiv/
  mkdir -p ./local_certs
  
  chmod +x ./generate-certificate.sh
  ./generate-certificate.sh
  tls_cert=./local_certs/cert.pem
  tls_key=./local_certs/local.key
fi
cp $tls_cert /var/contiv/ucn_cert.pem
cp $tls_key /var/contiv/ucn_key.pem

echo "Setting installation parameters"
sed -i.bak "s/__NETMASTER_IP__/$netmaster/g" $contiv_yaml
sed -i.bak "s/__VLAN_IF__/$vlan_if/g" $contiv_yaml

echo "Applying contiv installation"
kubectl apply -f $contiv_yaml
