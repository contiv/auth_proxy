#!/bin/bash

set -euo pipefail

CHECKS_CONTAINER_NAME="auth_proxy_checks"

docker build -t "auth_proxy_build_base" -f ./build/Dockerfile.base .
docker build -t $CHECKS_CONTAINER_NAME -f ./build/Dockerfile.checks .

# the auth_proxy directory exists in the base image, but it's empty so we'll
# bindmount the current directory into it.
docker run --rm \
       -v $(pwd):/go/src/github.com/contiv/auth_proxy:ro \
       $CHECKS_CONTAINER_NAME
