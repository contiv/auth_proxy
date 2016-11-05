#!/bin/bash

set -euo pipefail

# if both files exist, just exit
if [[ -f local.key && -f cert.pem ]]; then
    exit 0
fi

rm -f local.key
rm -f cert.pem

openssl genrsa -out local.key 2048 >/dev/null 2>&1
openssl req -new -x509 -sha256 -days 3650 \
	-key local.key -out cert.pem \
	-subj "/C=US/ST=CA/L=San Jose/O=CPSG/OU=IT Department/CN=ccn-local.cisco.com"

echo "Created local.key and cert.pem"
