#!/bin/bash

set -euxo pipefail

# disabling CGO makes `go build` generate a static binary which is what we want
# for our "scratch"-based final image.
export CGO_ENABLED=0

# output the binary under the build/output directory in the code dir so that it's
# available when we issue the `docker build` and COPY it into the final image.
go build \
   -ldflags "-X main.ProgramVersion=$VERSION" \
   -o ./build/output/auth_proxy \
   github.com/contiv/auth_proxy

strip ./build/output/auth_proxy
