docker_version="1.11.1"

echo "Checking for pre-requisites"

echo "Check that docker $docker_version is installed"
docker_status=`docker --version | grep "Docker version $docker_version" -o`
if [ "$docker_status" != "Docker version $docker_version" ]; then
  echo "Install docker $docker_version"
  exit 1
fi

docker_status=`systemctl status docker-tcp.socket | grep 'Active.*active' -o`
if [ "$docker_status" != "Active: active" ]; then
  echo "Install docker with tcp socket and rerun the UCN installer"
  exit 1
fi

echo "Starting the ansible container"
sudo docker run -v /shared/:/contiv/config -v /var/contiv:/var/contiv contiv/install:devbuild sh -c "./install/ansible/install.sh $@"
