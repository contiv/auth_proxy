#!/bin/bash

#
# systemtests.sh is invoked by the `make systemtests` target.
# It is responsible for setting up all the containers necessary for running our
# systemtest suite and running the tests themselves in a container against them.
#
# It does the following:
#
#  1. builds a systemtests container
#  2. creates a docker network (all containers are attached to it)
#  3. starts an etcd container
#  4. starts a consul container
#  5. starts a systemtests container (does nothing by default)
#  6. starts a auth_proxy container on port 10000 linked to etcd
#  7. starts a auth_proxy container on port 10001 linked to consul
#  8. executes ./scripts/systemtests_in_container.sh which runs all the systemtests
#     against the etcd proxy and consul proxy
#  9. stops etcd proxy container
# 10. stops consul proxy container
# 11. stops systemtests container
# 12. stops etcd container
# 13. stops consul container
# 14. destroys the docker network
#

set -euo pipefail

IMAGE_NAME="auth_proxy_systemtests"
NETWORK_NAME="auth_proxy_systemtests"
PROXY_IMAGE="contiv/auth_proxy:devbuild"

echo "Building systemtests image..."
docker build -t "auth_proxy_build_base" -f ./build/Dockerfile.base .
docker build -t $IMAGE_NAME -f ./build/Dockerfile.systemtests .

function ip_for_container {
    docker inspect -f '{{range .NetworkSettings.Networks}}{{.IPAddress}}{{end}}' $1
}

# ----- SETUP -------------------------------------------------------------------

echo "Creating docker network $NETWORK_NAME"
docker network rm $NETWORK_NAME 2>/dev/null || true
docker network create $NETWORK_NAME


echo "Starting etcd container..."
ETCD_CONTAINER_NAME="etcd_auth_proxy_systemtests"
ETCD_CONTAINER_ID=$(
    docker run -d \
       -p 2379:2379 \
       --name $ETCD_CONTAINER_NAME \
       --network $NETWORK_NAME \
       quay.io/coreos/etcd:v2.3.7 \
       --listen-client-urls http://0.0.0.0:2379 \
       --advertise-client-urls http://0.0.0.0:2379
)
ETCD_CONTAINER_IP=$(ip_for_container $ETCD_CONTAINER_ID)
echo "etcd running @ $ETCD_CONTAINER_IP:2379"


echo "Starting consul container..."
CONSUL_CONTAINER_NAME="consul_auth_proxy_systemtests"
CONSUL_CONTAINER_ID=$(
    docker run -d \
	   -p 8500:8500 \
	   --name $CONSUL_CONTAINER_NAME \
	   --network $NETWORK_NAME \
	   consul
)

CONSUL_CONTAINER_IP=$(ip_for_container $CONSUL_CONTAINER_ID)
echo "consul running @ $CONSUL_CONTAINER_IP:8500"


#
# NOTE: we start the systemtests container and then later use `docker exec` to
#       run the tests against etcd and consul.  The reason for starting it like
#       this is to avoid the chicken-and-egg problem of the systemtests (Go)
#       code needing to know the IP:port of the proxy and the proxy needing to
#       know the IP:port of where the MockServer (in the systemtests code) will
#       be listening.
#
echo "Starting systemtests container..."
# run with a tty so that bash (entrypoint) doesn't immediately exit
SYSTEMTESTS_CONTAINER_ID=$(
    docker run -d -t \
        --network $NETWORK_NAME \
	-e DEBUG="${DEBUG-}" \
	-e ETCD_CONTAINER_IP="$ETCD_CONTAINER_IP" \
	-e CONSUL_CONTAINER_IP="$CONSUL_CONTAINER_IP" \
        auth_proxy_systemtests
)
SYSTEMTESTS_CONTAINER_IP=$(ip_for_container $SYSTEMTESTS_CONTAINER_ID)
echo "systemtests container running @ $SYSTEMTESTS_CONTAINER_IP"


echo "Starting etcd proxy container..."
ETCD_PROXY_CONTAINER_ID=$(
    docker run -d \
	   -p 10000:10000 \
	   -v $(pwd)/local_certs:/local_certs:ro \
	   -e NO_NETMASTER_STARTUP_CHECK=true \
	   --network $NETWORK_NAME \
	   $PROXY_IMAGE \
	   --data-store-address="etcd://$ETCD_CONTAINER_IP:2379" \
	   --tls-certificate=/local_certs/cert.pem \
	   --tls-key-file=/local_certs/local.key \
	   --listen-address=0.0.0.0:10000 \
	   --netmaster-address="$SYSTEMTESTS_CONTAINER_IP:9999"
)
ETCD_PROXY_CONTAINER_IP=$(ip_for_container $ETCD_PROXY_CONTAINER_ID)
ETCD_PROXY_ADDRESS="$ETCD_PROXY_CONTAINER_IP:10000"
echo "etcd proxy container running @ $ETCD_PROXY_CONTAINER_IP:10000"


echo "Starting consul proxy container..."
CONSUL_PROXY_CONTAINER_ID=$(
    docker run -d \
	   -p 10001:10001 \
	   -v $(pwd)/local_certs:/local_certs:ro \
	   --network $NETWORK_NAME \
	   -e NO_NETMASTER_STARTUP_CHECK=true \
	   $PROXY_IMAGE \
	   --data-store-address="consul://$CONSUL_CONTAINER_IP:8500" \
	   --tls-certificate=/local_certs/cert.pem \
	   --tls-key-file=/local_certs/local.key \
	   --listen-address=0.0.0.0:10001 \
	   --netmaster-address="$SYSTEMTESTS_CONTAINER_IP:9999"
)
CONSUL_PROXY_CONTAINER_IP=$(ip_for_container $CONSUL_PROXY_CONTAINER_ID)
CONSUL_PROXY_ADDRESS="$CONSUL_PROXY_CONTAINER_IP:10001"
echo "consul proxy container running @ $CONSUL_PROXY_CONTAINER_IP:10001"

# ----- TEST EXECUTION ----------------------------------------------------------

echo "Executing systemtests..."

set +e

# you can't pass in envvars to docker exec and we didn't know the IPs of the proxy
# containers when we started this container, so pass them in as arguments here.
docker exec $SYSTEMTESTS_CONTAINER_ID bash ./scripts/systemtests_in_container.sh $ETCD_PROXY_ADDRESS $CONSUL_PROXY_ADDRESS
test_exit_code=$?

set -e

# ---- CLEANUP ------------------------------------------------------------------

echo "Stopping etcd proxy container..."
docker rm -f -v $ETCD_PROXY_CONTAINER_ID

echo "Stopping consul proxy container..."
docker rm -f -v $CONSUL_PROXY_CONTAINER_ID

echo "Shutting down systemtests container..."
docker rm -f -v $SYSTEMTESTS_CONTAINER_ID

echo "Shutting down etcd container..."
docker rm -f -v $ETCD_CONTAINER_NAME

echo "Shutting down consul container..."
docker rm -f -v $CONSUL_CONTAINER_NAME

echo "Destroying docker network $NETWORK_NAME"
docker network rm $NETWORK_NAME

if [[ "$test_exit_code" != "0" ]]; then
    echo "Tests failed with exit code: $test_exit_code"
    exit 1
fi
