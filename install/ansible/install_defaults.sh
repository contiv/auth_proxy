src_conf_path=/tmp/contiv/config
container_conf_path=/var/contiv

# These paths are in the installer container
contiv_config=$container_conf_path/cfg.yml
installer_config=$container_conf_path/ucn.conf
tls_cert=$container_conf_path/cert.pem
tls_key=$container_conf_path/key.pem
ans_key=$container_conf_path/insecure_private_key

# These paths are on the host
host_contiv_config=$src_conf_path/cfg.yml
host_installer_config=$src_conf_path/ucn.conf
host_tls_cert=$src_conf_path/cert.pem
host_tls_key=$src_conf_path/key.pem
host_ans_key=$src_conf_path/insecure_private_key
