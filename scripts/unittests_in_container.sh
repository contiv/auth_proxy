#!/bin/bash

set -uo pipefail

ETCD_ADDRESS="http://$ETCD_CONTAINER_IP:2379"
CONSUL_ADDRESS="http://$CONSUL_CONTAINER_IP:8500"

EXIT_CODES=()

echo ""
echo "===== DB TESTS ============================================================"
echo ""

echo "consul:"
echo ""
DATASTORE_DRIVER=consul DATASTORE_ADDRESS=$CONSUL_ADDRESS go test -v -timeout 1m ./db -check.v
EXIT_CODES+=($?)
echo ""

echo "etcd:"
echo ""
DATASTORE_DRIVER=etcd DATASTORE_ADDRESS=$ETCD_ADDRESS go test -v -timeout 1m ./db -check.v
EXIT_CODES+=($?)
echo ""

echo ""
echo "===== STATE TESTS ========================================================="
echo ""

echo "etcd:"
echo ""
DATASTORE_DRIVER=etcd DATASTORE_ADDRESS=$ETCD_ADDRESS go test -run TestAuthZ* -v -timeout 1m ./state -check.v
EXIT_CODES+=($?)
DATASTORE_DRIVER=etcd DATASTORE_ADDRESS=$ETCD_ADDRESS go test -run TestEtcd* -v -timeout 1m ./state -check.v
EXIT_CODES+=($?)
echo ""

echo "consul:"
echo ""
DATASTORE_DRIVER=consul DATASTORE_ADDRESS=$CONSUL_ADDRESS go test -run TestConsul* -v -timeout 1m ./state -check.v
EXIT_CODES+=($?)
echo ""

for exit_code in $EXIT_CODES; do
	if [[ "$exit_code" != "0" ]]; then
		exit 1
	fi
done

exit 0
