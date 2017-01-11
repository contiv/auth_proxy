ssh_key=${UCN_SSH_KEY:-"cluster/export/insecure_private_key"}
user=${UCN_SSH_USER:-"vagrant"}
install_version=${UCN_RELEASE:-"ucn-devbuild"}
contiv_os=${CONTIV_NODE_OS:-"centos7"}
ucn_master=${UCN_MASTER:-"192.168.2.10"}
dest_path=${UCN_TARGET:-"/home/vagrant"}
ssh_opts="-o UserKnownHostsFile=/dev/null -o StrictHostKeyChecking=no"

# Copy the installation folder
scp $ssh_opts -i $ssh_key release/$install_version.tgz $user@$ucn_master:$dest_path

# Extract and launch the installer
ssh $ssh_opts -i $ssh_key $user@$ucn_master "sudo rm -rf $dest_path/$install_version"
ssh $ssh_opts -i $ssh_key $user@$ucn_master "cd $dest_path && tar -xvzf $install_version.tgz"
ssh $ssh_opts -i $ssh_key $user@$ucn_master "cd $dest_path/$install_version && chmod +x install/install.sh"
ssh $ssh_opts -i $ssh_key $user@$ucn_master "cd $dest_path/$install_version && chmod +x install/k8s/install.sh"
ssh $ssh_opts -i $ssh_key $user@$ucn_master "cd $dest_path/$install_version && sudo ./install/install.sh"
ssh $ssh_opts -i $ssh_key $user@$ucn_master "cd $dest_path/$install_version && sudo ./install/k8s/install.sh -n $ucn_master"

# Wait for UCN to start up
sleep 60
response=`curl -k -H "Content-Type: application/json" -X POST -d '{"username": "admin", "password": "admin"}' https://$ucn_master:10000/api/v1/ccn_proxy/login`
echo $response
if  [[ $response == *"token"* ]]; then
  echo "Install SUCCESS"
else
  echo "Install FAILED"
fi
