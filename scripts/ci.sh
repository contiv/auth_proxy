#!/bin/bash

set -euo pipefail

echo ""
echo "===== generate local certificates ====="
echo ""
make generate-certificate

echo ""
echo "===== build images ====="
echo ""
make build

echo ""
echo "===== unit tests ====="
echo ""
make unit-tests

echo ""
echo "===== systemtests ====="
echo ""
make systemtests
