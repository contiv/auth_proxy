# Cisco Unified Container Networking Installer

## Docker Swarm installation

### Pre-requisites
* Supported operating systems are CentOS 7.x or RHEL 7.x.
* Docker needs to be installed on the host where the installer is being run.
* Install a docker swarm cluster (or)
  Use the UCN installer to install the scheduler stack after installing docker
  on a node external to the cluster where the scheduler stack is being installed.

### UCN Installation

* Download the install bundle `<TODO add a location here>`
* Extract the install bundle and cd to the extracted folder.
* To load the installer container image run `docker load -i ucn-install-image.tar`
* Run `./install/ansible/install_swarm.sh -f install/ansible/cfg.yml -n $ucn_master -e cluster/export/insecure_private_key` to install UCN without the scheduler stack.
* Run `./install/ansible/install_swarm.sh -f install/ansible/cfg.yml -n $ucn_master -e cluster/export/insecure_private_key -i` to install UCN with the scheduler stack.
* To see additional install options run `./install/ansible/install_swarm.sh`.

## Kubernetes 1.4 installation

### Pre-requisites

* Supported operating systems are CentOS 7.x or RHEL 7.x.
* Install kubernetes 1.4 or higher using http://kubernetes.io/docs/getting-started-guides/kubeadm/.

### UCN Installation

* Download the install bundle  `<TODO add a location here>`.
* Extract the install bundle.
* Run `sudo ./install/k8s/install.sh -n $ucn_master`.
  where $ucn_master is the IP to be used for the UCN proxy.
* To see additional install options run `./install/ansible/install.sh`.
