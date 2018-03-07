#!/bin/bash

set -euo pipefail

DEV_IMAGE_NAME="devbuild"
IMAGE_NAME="contiv/auth_proxy"
BUILD_IMAGE_NAME="${IMAGE_NAME}_build"
VERSION=${BUILD_VERSION-$DEV_IMAGE_NAME}

# create a local build image
docker build -t $BUILD_IMAGE_NAME -f ./build/Dockerfile.build .

# use the build image to compile a static binary
docker run \
	-e VERSION="$VERSION" \
	--name build_cntr \
	$BUILD_IMAGE_NAME

# copy out the binaries
docker cp build_cntr:/go/src/github.com/contiv/auth_proxy/build/output/auth_proxy ./build/output/
docker rm -fv build_cntr

docker build -t $IMAGE_NAME:$VERSION -f ./build/Dockerfile.release .
echo "Created image: $IMAGE_NAME:$VERSION"

rm -f ./build/output/auth_proxy
