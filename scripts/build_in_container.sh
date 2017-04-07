#!/bin/bash

set -euxo pipefail

# disabling CGO makes `go build` generate a static binary which is what we want
# for our "scratch"-based final image.
export CGO_ENABLED=0

# output the binary under the build/output directory from where it will be
# `docker cp`ed into the final image.
go build \
	-ldflags "-X main.ProgramVersion=$VERSION" \
	-o ./build/output/auth_proxy \
	github.com/contiv/auth_proxy

strip ./build/output/auth_proxy
