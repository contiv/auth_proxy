#!/bin/bash

#
# unittests.sh is invoked by the `make unit-tests` target.
# It is responsible for setting up all the containers necessary for running our
# unit test suites and running the tests themselves in a container against them.
#
# It does the following:
#
# 1. builds a unit tests container
# 2. creates a docker network (all containers are attached to it)
# 3. starts an etcd container
# 4. starts a consul container
# 5. executes ./scripts/unittests_in_container.sh which runs all the unit test
#    suites against the etcd and consul containers
# 6. stops etcd container
# 7. stops consul container
# 8. destroys the docker network

set -euo pipefail

IMAGE_NAME="auth_proxy_unittests"
NETWORK_NAME="$IMAGE_NAME"

echo "Building unittests image..."
docker build -t $IMAGE_NAME -f ./build/Dockerfile.unittests .

function ip_for_container {
    docker inspect -f '{{range .NetworkSettings.Networks}}{{.IPAddress}}{{end}}' $1
}

# ----- SETUP -------------------------------------------------------------------

echo "Creating docker network $NETWORK_NAME"
docker network rm $NETWORK_NAME 2>/dev/null || true
docker network create $NETWORK_NAME

echo "Starting etcd container..."
ETCD_CONTAINER_NAME="etcd_auth_proxy_unittests"
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
CONSUL_CONTAINER_NAME="consul_auth_proxy_unittests"
CONSUL_CONTAINER_ID=$(
    docker run -d \
	   -p 8500:8500 \
	   --name $CONSUL_CONTAINER_NAME \
	   --network $NETWORK_NAME \
	   consul
)
CONSUL_CONTAINER_IP=$(ip_for_container $CONSUL_CONTAINER_ID)
echo "consul running @ $CONSUL_CONTAINER_IP:8500"

# ----- EXECUTION ---------------------------------------------------------------

echo "Running unit tests"

set +e

docker run --rm \
        --network $NETWORK_NAME \
        --name $IMAGE_NAME \
        -v /var/run/docker.sock:/var/run/docker.sock \
        -e CONSUL_CONTAINER_IP="$CONSUL_CONTAINER_IP" \
        -e CONSUL_CONTAINER_NAME="$CONSUL_CONTAINER_NAME" \
        -e ETCD_CONTAINER_IP="$ETCD_CONTAINER_IP" \
        -e ETCD_CONTAINER_NAME="$ETCD_CONTAINER_NAME" \
        $IMAGE_NAME
test_exit_code=$?

set -e

# ----- CLEANUP -----------------------------------------------------------------

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
