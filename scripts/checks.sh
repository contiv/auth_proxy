#!/bin/bash

set -euo pipefail

CHECKS_CONTAINER_NAME="ccn_proxy_checks"

docker build -t "ccn_proxy_build_base" -f ./build/Dockerfile.base .
docker build -t $CHECKS_CONTAINER_NAME -f ./build/Dockerfile.checks .

# the ccn_proxy directory exists in the base image, but it's empty so we'll
# bindmount the current directory into it.
docker run --rm \
       -v $(pwd):/go/src/github.com/contiv/ccn_proxy:ro \
       $CHECKS_CONTAINER_NAME
