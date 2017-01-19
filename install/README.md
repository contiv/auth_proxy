# Cisco Unified Container Networking Installer

## Docker Swarm installation

### Pre-requisites
* Supported operating systems are CentOS 7.x or RHEL 7.x.
* Docker needs to be installed on the host where the installer is being run.
* Install a docker swarm cluster (or)
  Use the UCN installer to install the scheduler stack after installing docker
  on a node external to the cluster where the scheduler stack is being installed.

### UCN Installation

UCN swarm installer is launched from a host external to the cluster. Here is the reference layout. All the nodes need to be accessible to the installer host.

                                 ┌─────────────────────────────────────────────────────────────────────┐         
                                 │        #####  #       #     #  #####  ####### ####### ######        │         
                                 │       #     # #       #     # #     #    #    #       #     #       │         
                                 │       #       #       #     # #          #    #       #     #       │         
                                 │       #       #       #     #  #####     #    #####   ######        │         
                                 │       #       #       #     #       #    #    #       #   #         │         
                                 │       #     # #       #     # #     #    #    #       #    #        │         
                                 │        #####  #######  #####   #####     #    ####### #     #       │         
                                 │                                                                     │         
                                 │                                                                     │         
                                 │                                         ┌────────────────────┐      │         
                                 │                                         │                    │      │         
                ┌──────── SSH  ──┼─────────────────────────────────────────▶    Worker Node     │      │         
                │                │         ┌────────────────────┐          │                    │      │         
                │                │         │                    │          └────────────────────┘      │         
                │                │  ┌──────▶    Master Node     │                                      │         
                │                │  │      │                    │          ┌────────────────────┐      │         
                │                │  │      └────────────────────┘          │                    │      │         
   ┌────────────┴────────────┐   │  │                                      │    Worker Node     ◀──────┼────────┐
   │                         │   │  │                                      │                    │      │        │
   │      Install Host       │   │  │      ┌────────────────────┐          │                    │      │        │
   │(Ansible based installer,│   │         │                    │          └────────────────────┘      │        │
   │   running in a docker   │───┼── SSH  ─▶    Master Node     │                                      │        │
   │       container)        │   │         │                    │          ┌────────────────────┐      │        │
   │                         │   │  │      └────────────────────┘          │                    │      │        │
   │                         │   │  │                                      │    Worker Node     │◀─────┼────────┤
   └────────────┬────────────┘   │  │                                      │                    │      │        │
                │                │  │      ┌────────────────────┐          │                    │      │        │
                │                │  │      │                    │          └────────────────────┘      │        │
                │                │  └──────▶    Master Node     │                                      │        │
                │                │         │                    │          ┌────────────────────┐      │        │
                │                │         └────────────────────┘          │                    │      │        │
                ├───────── SSH  ─┼─────────────────────────────────────────▶    Worker Node     │      │        │
                │                │                                         │                    │      │        │
                │                │                                         └────────────────────┘      │        │
                │                │                                                                     │        │
                │                │                                                                     │        │
                │                │                                                                     │        │
                │                │                                                                     │        │
                │                └─────────────────────────────────────────────────────────────────────┘        │
                │                                                                                               │
                │                                                                                               │
                └─────────────────────────────────────────────── SSH  ──────────────────────────────────────────┘
                                                                                                                 

* Download the install bundle `<TODO add a location here>`. This is of the form ucn-VERSIONTAG.tgz.
* Extract the install bundle `tar xvzf ucn-VERSIONTAG.tgz`  
* cd to the extracted folder `cd ucn-VERSIONTAG`
* To load the installer container image run `docker load -i ucn-install-image.tar`
* Run `./install/ansible/install_swarm.sh -f <host config file> -n <ucn master> -e <ansible ssh key> -a <additional ansible options>` to install UCN without the scheduler stack.
* Run `./install/ansible/install_swarm.sh -f <host config file> -n <ucn master> -e <ansible ssh key> -a <additional ansible options> -i` to install UCN with the scheduler stack.
* To specify a user to user for the Ansible ssh login, specify "-u <username>" as the additional andible option.
* Example host config file is available at install/ansible/cfg.yml
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
