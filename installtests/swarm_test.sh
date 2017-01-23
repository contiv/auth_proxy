ucn_master=192.168.2.12
install_version="ucn-${BUILD_VERSION:-devbuild}"

# Extract and launch the installer
cd release && tar -xvzf $install_version.tgz
cd $install_version
docker load -i ucn-install-image.tar
./install/ansible/install_swarm.sh -f install/ansible/cfg.yml -n $ucn_master -e ../../cluster/export/insecure_private_key -i

# Wait for UCN to start up
sleep 60
response=`curl -k -H "Content-Type: application/json" -X POST -d '{"username": "admin", "password": "admin"}' https://$ucn_master:10000/api/v1/auth_proxy/login`
echo $response
if  [[ $response == *"token"* ]]; then
  echo "Install SUCCESS"
else
  echo "Install FAILED"
fi
