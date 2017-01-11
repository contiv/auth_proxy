Role Name
=========

Role to install Cisco UCN API Proxy and UI

Requirements
------------

Docker needs to be installed to run the UCN proxy container.

Role Variables
--------------

ucn_image specifies the image with version tag to be used to spin up the UCN container.
ucn_cert, ucn_key specify files to use for the proxy server certificates.
ucn_port is the host port and ucn_datastore the cluster data store address.

Dependencies
------------

docker

Example Playbook
----------------

- hosts: netplugin-node
  become: true
      roles:
        - { role: ucn_proxy, ucn_port: 10000, ucn_datastore: etcd://netmaster:2379 }

License
-------

BSD

Author Information
------------------

Please see contiv.io for more information.
