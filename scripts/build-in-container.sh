#!/bin/bash

set -euxo pipefail

# disabling CGO makes `go build` generate a static binary which is what we want
# for our "scratch"-based final image.
export CGO_ENABLED=0

# output the binary under the build/output directory in the code dir so that it's
# available when we issue the `docker build` and COPY it into the final image.
go build \
   -ldflags "-X main.ProgramVersion=$VERSION" \
   -o ./build/output/ccn_proxy \
   github.com/contiv/ccn_proxy

strip ./build/output/ccn_proxy

docker build -t $IMAGE_NAME:$VERSION -f ./build/Dockerfile.release .
