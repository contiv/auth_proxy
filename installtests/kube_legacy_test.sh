ssh_key=${UCN_SSH_KEY:-cluster/insecure_private_key}
user=${UCN_SSH_USER:-vagrant}
install_bundle=${UCN_RELEASE:-release/ucn-devbuild.tgz}
contiv_os=${CONTIV_NODE_OS:-centos7}

# Copy the installation folder
scp -i $ssh_key $install_bundle $user@ucn-master:/tmp/

# Copy the configuration file
scp -i $ssh_key $config_file $user@ucn-master:/tmp/

# Extract and launch the installer
ssh -i $ssh_key $user@ucn-master "cd /tmp && tar -xvzf $install_bundle && chmod +x ucn/ansible/install_k8s.sh"
ssh -i $ssh_key $user@ucn-master "VAGRANT_USE_KUBEADM=1 CONTIV_NODE_OS=$contiv_os ucn/ansible/install_k8s.sh"
