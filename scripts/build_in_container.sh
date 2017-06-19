#!/bin/bash

set -euxo pipefail

# disabling CGO makes `go build` generate a static binary which is what we want
# for our "scratch"-based final image.
export CGO_ENABLED=0

# we set the -s and -w linker flags to strip unncessary debug info from the
# final binary.  this is the correct way to do it.  using `strip` is not.
# see the following for details on the flags: https://golang.org/cmd/link/

# we output the binaries under the build/output directory from where they will
# be `docker cp`ed into the final image.
go build \
	-ldflags "-s -w -X main.ProgramVersion=$VERSION" \
	-o ./build/output/auth_proxy \
	github.com/contiv/auth_proxy

go build \
	-ldflags "-s -w" \
	-o ./build/output/reset_local_user_password \
	github.com/contiv/auth_proxy/reset_local_user_password
