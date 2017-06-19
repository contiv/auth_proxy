#!/bin/bash

set -euxo pipefail

# disabling CGO makes `go build` generate a static binary which is what we want
# for our "scratch"-based final image.
export CGO_ENABLED=0

# we also set the -s and -w linker flags to strip unncessary debug info from the
# final binary.  this is the correct way to do it.  using `strip` is not.
# see the following for details on the flags: https://golang.org/cmd/link/

# output the binary under the build/output directory from where it will be
# `docker cp`ed into the final image.
go build \
	-ldflags "-s -w -X main.ProgramVersion=$VERSION" \
	-o ./build/output/auth_proxy \
	github.com/contiv/auth_proxy
