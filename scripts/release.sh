#!/bin/bash

set -euo pipefail

DEV_IMAGE_NAME="devbuild"
IMAGE_NAME="contiv/auth_proxy"
VERSION=${BUILD_VERSION-$DEV_IMAGE_NAME}

auth_proxy_version=$VERSION
aci_gw_version=${CONTIV_ACI_GW_VERSION:-"latest"}
contiv_version=${CONTIV_VERSION:-"v1.0.0-alpha-01-21-2017.20-19-23.UTC"}
etcd_version=${CONTIV_ETCD_VERSION:-2.3.7}
docker_version=${CONTIV_DOCKER_VERSION:-1.12.6}

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

while getopts ":a:p:c:e:" opt; do
    case $opt in
       a)
          aci_gw_version=$OPTARG
          ;;
       c)
          contiv_version=$OPTARG
          ;;
       e)
          etcd_version=$OPTARG
          ;;
       p)
          auth_proxy_version=$OPTARG
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
output_dir="$release_dir/contiv-$auth_proxy_version/"
output_file="$release_dir/contiv-$auth_proxy_version.tgz"
tmp_output_file="contiv-$auth_proxy_version.tgz"

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
curl -sSL https://github.com/contiv/netplugin/releases/download/$contiv_version/netplugin-$contiv_version.tar.bz2 -o $output_dir/netplugin-$contiv_version.tar.bz2
pushd $output_dir
tar xvfj netplugin-$contiv_version.tar.bz2 netctl
rm -f netplugin-$contiv_version.tar.bz2
popd

# Replace versions
ansible_yaml_dir=$output_dir/install/ansible/
ansible_env=$ansible_yaml_dir/env.json

k8s_yaml_dir=$output_dir/install/k8s/
contiv_yaml=$k8s_yaml_dir/contiv.yaml
aci_gw_yaml=$k8s_yaml_dir/aci_gw.yaml
auth_proxy_yaml=$k8s_yaml_dir/auth_proxy.yaml
etcd_yaml=$k8s_yaml_dir/etcd.yaml
ansible_proxy_spec=$output_dir/ansible/roles/auth_proxy/defaults/main.yml

sed -i.bak "s/__CONTIV_VERSION__/$contiv_version/g" $contiv_yaml
sed -i.bak "s/__API_PROXY_VERSION__/$auth_proxy_version/g" $auth_proxy_yaml
sed -i.bak "s/__ACI_GW_VERSION__/$aci_gw_version/g" $aci_gw_yaml
sed -i.bak "s/__ETCD_VERSION__/$etcd_version/g" $etcd_yaml

sed -i.bak "s/__DOCKER_VERSION__/$docker_version/g" $ansible_env
sed -i.bak "s/__CONTIV_VERSION__/$contiv_version/g" $ansible_env
sed -i.bak "s/__ACI_GW_VERSION__/$aci_gw_version/g" $ansible_env
sed -i.bak "s/__API_PROXY_VERSION__/$auth_proxy_version/g" $ansible_env
sed -i.bak "s/__ETCD_VERSION__/$etcd_version/g" $ansible_env

chmod +x $output_dir/install/install.sh
chmod +x $k8s_yaml_dir/install.sh
chmod +x $k8s_yaml_dir/uninstall.sh
chmod +x $ansible_yaml_dir/install_swarm.sh
sed -i.bak "s/__API_PROXY_VERSION__/$auth_proxy_version/g" $ansible_yaml_dir/install_swarm.sh
chmod +x $ansible_yaml_dir/uninstall_swarm.sh

# Cleanup the backup files
rm -f $k8s_yaml_dir/*.bak
rm -f $ansible_yaml_dir/*.bak

# Build the docker container for the swarm installation
ansible_spec=$output_dir/install/ansible/Dockerfile
cp -rf ansible $output_dir/
cp -rf scripts $output_dir/
echo sed -i.bak "s/__API_PROXY_VERSION__/$auth_proxy_version/g" $ansible_proxy_spec
sed -i.bak "s/__API_PROXY_VERSION__/$auth_proxy_version/g" $ansible_proxy_spec
docker build --no-cache -t contiv/install:$auth_proxy_version -f $ansible_spec $output_dir
rm -rf $output_dir/ansible
rm -rf $output_dir/scripts
if [ "$DEV_IMAGE_NAME" = "$VERSION" ]; then
  # This is a dev build, so save the images locally.
  docker save contiv/install:$auth_proxy_version -o $output_dir/contiv-install-image.tar
  docker save $IMAGE_NAME:$VERSION -o $output_dir/auth-proxy-image.tar
else
  echo "**************************************************************************************************"
  echo " Please ensure $IMAGE_NAME:$VERSION and contiv/install:$auth_proxy_version are pushed to docker hub"
  echo "**************************************************************************************************"
fi

# Clean up the Dockerfile, this is not part of the release bits.
rm -f $ansible_spec

tar -cvzf $tmp_output_file -C $release_dir .
mv $tmp_output_file $output_file
rm -rf $output_dir

echo "Success: Contiv Installer version $auth_proxy_version is available at $output_file"
