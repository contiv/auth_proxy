# Cisco Unified Container Networking Installer

## Docker Swarm installation

### Pre-requisites
* Supported operating systems are CentOS 7.x or RHEL 7.x
* Install a docker swarm cluster (or)
  Install docker on the netmaster node and use the UCN installer to install the scheduler stack.
  This requires the docker-tcp.socket to be enabled and active.

### UCN Installation

* Download the install bundle `<TODO add a location here>`
* Extract the install bundle
* Run `./install/ansible/install_swarm.sh "-n $ucn_master -f install/ansible/cfg.yml"` to install UCN without the scheduler stack
* Run `./install/ansible/install_swarm.sh "-n $ucn_master -f install/ansible/cfg.yml -i"` to install UCN with the scheduler stack
* To see additional install options run `./install/ansible/install_swarm.sh`

## Kubernetes 1.4 installation

### Pre-requisites

* Supported operating systems are CentOS 7.x or RHEL 7.x
* Install kubernetes 1.4 or higher using http://kubernetes.io/docs/getting-started-guides/kubeadm/

### UCN Installation

* Download the install bundle  `<TODO add a location here>`
* Extract the install bundle
* Run `sudo ./install/k8s/install.sh -n $ucn_master`
  where $ucn_master is the IP to be used for the UCN proxy
* To see additional install options run `./install/ansible/install.sh`
