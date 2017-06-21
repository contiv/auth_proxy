#!/bin/bash

set -euo pipefail

CHECKS_CONTAINER_NAME="auth_proxy_checks"

docker build -t $CHECKS_CONTAINER_NAME -f ./build/Dockerfile.checks .

docker run --rm $CHECKS_CONTAINER_NAME
