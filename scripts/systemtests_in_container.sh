#!/bin/bash

set -euxo pipefail

echo ""
echo "Running systemtests against etcd"
echo ""

set -x
PROXY_ADDRESS=$1 USE_DATASTORE_ADDRESS="etcd://$ETCD_CONTAINER_IP:2379" go test -v -timeout 5m ./systemtests -check.v
set +x

echo ""
echo "Running systemtests against consul"
echo ""

set -x
PROXY_ADDRESS=$2 USE_DATASTORE_ADDRESS="consul://$CONSUL_CONTAINER_IP:8500" go test -v -timeout 5m ./systemtests -check.v
set +x
