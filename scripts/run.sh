#!/bin/bash

set -euxo pipefail

make generate-certificate

# if DOCKER_HOST is not set, just run the image locally.
# otherwise, scp the key and cert over to the docker machine before starting it.
if [ -z "${DOCKER_HOST-}" ]; then
    echo "Running on local machine:"
    docker run --rm \
     -p 9999:9999 \
	   -v $PWD/local_certs:/certs ccn_proxy:devbuild \
	   --tls-key-file=/certs/local.key \
	   --tls-certificate=/certs/cert.pem
else
    echo "Copying certificates to docker-machine:"
    cert_path="/tmp/ccn_proxy/"

    docker-machine ssh $DOCKER_MACHINE_NAME mkdir -p $cert_path
    docker-machine scp './local_certs/local.key' $DOCKER_MACHINE_NAME:$cert_path
    docker-machine scp './local_certs/cert.pem'  $DOCKER_MACHINE_NAME:$cert_path

    echo "Running on Docker Machine:"
    docker run --rm \
     -p 9999:9999 \
	   -v $cert_path:/certs ccn_proxy:devbuild \
	   --tls-key-file=/certs/local.key \
	   --tls-certificate=/certs/cert.pem
fi
