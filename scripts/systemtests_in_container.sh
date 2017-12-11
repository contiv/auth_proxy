#!/bin/bash

set -uo pipefail

EXIT_CODES=()

echo ""
echo "Running systemtests against etcd"
echo ""

set -x
PROXY_ADDRESS=$1 DATASTORE_DRIVER=etcd DATASTORE_ADDRESS="http://$ETCD_CONTAINER_IP:2379" go test -v -timeout 5m ./systemtests -check.v
EXIT_CODES+=($?)
set +x

echo ""
echo "Running systemtests against consul"
echo ""

set -x
PROXY_ADDRESS=$2 DATASTORE_DRIVER=consul DATASTORE_ADDRESS="http://$CONSUL_CONTAINER_IP:8500" go test -v -timeout 5m ./systemtests -check.v
EXIT_CODES+=($?)
set +x

for exit_code in $EXIT_CODES; do
	if [[ "$exit_code" != "0" ]]; then
		exit 1
	fi
done

exit 0
