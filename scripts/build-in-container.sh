#!/bin/bash

set -euo pipefail

# disabling CGO makes `go build` generate a static binary which is what we want
# for our "scratch"-based final image.
export CGO_ENABLED=0

VERSION=${BUILD_VERSION-devbuild}

go build \
   -ldflags "-X main.version=$VERSION" \
   -o /output/ccn_proxy \
   github.com/contiv/ccn_proxy/ccn_proxy

strip /output/ccn_proxy
