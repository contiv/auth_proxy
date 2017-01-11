#!/bin/bash

set -euo pipefail

DEV_IMAGE_NAME="devbuild"
IMAGE_NAME="ccn_proxy"
VERSION=${BUILD_VERSION-$DEV_IMAGE_NAME}

ucn_proxy_version=$VERSION
aci_gw_image="contiv\/aci-gw"
contiv_version=${CONTIV_VERSION:-v0.1-11-30-2016.20-08-20.UTC}
etcd_version=${CONTIV_ETCD_VERSION:-2.3.7}
docker_version=${CONTIV_DOCKER_VERSION:-1.11.1}

function usage {
  echo "Usage:"
  echo "./release.sh -a <ACI gateway image> -c <contiv version> -e <etcd version> -p <API proxy image version> " 
  exit 1
}

function error_ret {
  echo ""
  echo $1
  exit 1
}

while getopts ":a:p:" opt; do
    case $opt in
       a)
          aci_gw_image=$OPTARG
          ;;
       c)
          contiv_version=$OPTARG
          ;;
       e)
          etcd_version=$OPTARG
          ;;
       p)
          ucn_proxy_version=$OPTARG
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

release_dir="release"
output_dir="$release_dir/ucn-$ucn_proxy_version/"
output_file="$release_dir/ucn-$ucn_proxy_version.tgz"

# Clean older dist folders and release binaries
rm -rf $output_dir
rm -rf $output_file

# Release files 
# k8s - install.sh to take the args and construct contiv.yaml as required and to launch kubectl
# swarm - install.sh launches the container to do the actual installation
# Top level install.sh which will either take k8s/swarm install params and do the required.
mkdir -p $output_dir
cp -rf install $output_dir
cp -rf scripts/generate-certificate.sh $output_dir

# This is maybe optional - but assume we need it for
curl -sSL https://cisco.box.com/shared/static/zzmpe1zesdpf270k9pml40rlm4o8fs56.rpm -o $output_dir/openvswitch-2.3.1.rpm

# Replace versions
ansible_yaml_dir=$output_dir/install/ansible/
ansible_env=$ansible_yaml_dir/env.json

k8s_yaml_dir=$output_dir/install/k8s/
contiv_yaml=$k8s_yaml_dir/contiv.yaml
aci_gw_yaml=$k8s_yaml_dir/aci_gw.yaml
ucn_proxy_yaml=$k8s_yaml_dir/ucn_proxy.yaml
etcd_yaml=$k8s_yaml_dir/etcd.yaml
ansible_proxy_spec=$output_dir/ansible/roles/ucn_proxy/defaults/main.yml

sed -i.bak "s/__CONTIV_VERSION__/$contiv_version/g" $contiv_yaml
sed -i.bak "s/__API_PROXY_VERSION__/$ucn_proxy_version/g" $ucn_proxy_yaml
sed -i.bak "s/__ACI_GW_IMAGE__/$aci_gw_image/g" $aci_gw_yaml
sed -i.bak "s/__ETCD_VERSION__/$etcd_version/g" $etcd_yaml

sed -i.bak "s/__DOCKER_VERSION__/$docker_version/g" $ansible_env
sed -i.bak "s/__CONTIV_VERSION__/$contiv_version/g" $ansible_env
sed -i.bak "s/__ACI_GW_IMAGE__/$aci_gw_image/g" $ansible_env
sed -i.bak "s/__API_PROXY_VERSION__/$ucn_proxy_version/g" $ansible_env
sed -i.bak "s/__ETCD_VERSION__/$etcd_version/g" $ansible_env

# Cleanup the backup files
rm -f $k8s_yaml_dir/*.bak
rm -f $ansible_yaml_dir/*.bak

# Build the docker container for the swarm installation
ansible_spec=$output_dir/install/ansible/Dockerfile
cp -rf ansible $output_dir/
cp -rf scripts $output_dir/
echo sed -i.bak "s/__API_PROXY_VERSION__/$ucn_proxy_version/g" $ansible_proxy_spec
sed -i.bak "s/__API_PROXY_VERSION__/$ucn_proxy_version/g" $ansible_proxy_spec
docker build -t contiv/install:$ucn_proxy_version -f $ansible_spec $output_dir
rm -rf $output_dir/ansible
rm -rf $output_dir/scripts

# TODO - have an option to push this to the hub instead
docker save contiv/install:$ucn_proxy_version -o $output_dir/ucn-install-image.tar
docker save $IMAGE_NAME:$VERSION -o $output_dir/ucn-proxy-image.tar

# Clean up the Dockerfile, this is not part of the release bits.
rm -f $ansible_spec

tar -cvzf $output_file -C $release_dir .
rm -rf $output_dir

echo "Success: UCN $ucn_proxy_version is available at $output_file"
