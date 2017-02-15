#!/bin/bash

set -uo pipefail

ETCD_ADDRESS="etcd://$ETCD_CONTAINER_IP:2379"
CONSUL_ADDRESS="consul://$CONSUL_CONTAINER_IP:8500"

echo ""
echo "===== DB TESTS ============================================================"
echo ""

echo "etcd:"
echo ""
DATASTORE_ADDRESS=$ETCD_ADDRESS go test -v -timeout 1m ./db -check.v
echo ""

echo "consul:"
echo ""
DATASTORE_ADDRESS=$CONSUL_ADDRESS go test -v -timeout 1m ./db -check.v
echo ""

echo ""
echo "===== STATE TESTS ========================================================="
echo ""

echo "etcd:"
echo ""
DATASTORE_ADDRESS=$ETCD_ADDRESS go test -run TestAuthZ*  -v -timeout 1m ./state -check.v
DATASTORE_ADDRESS=$ETCD_ADDRESS go test -run TestEtcd*   -v -timeout 1m ./state -check.v
echo ""

echo "consul:"
echo ""
DATASTORE_ADDRESS=$CONSUL_ADDRESS go test -run TestConsul* -v -timeout 1m ./state -check.v
echo ""
