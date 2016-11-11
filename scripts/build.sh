#!/bin/bash

set -euo pipefail

DEV_IMAGE_NAME="devbuild"
IMAGE_NAME="ccn_proxy"
BUILD_IMAGE_NAME="${IMAGE_NAME}_build"
VERSION=${BUILD_VERSION-$DEV_IMAGE_NAME}

# create a local build image
docker build -t $BUILD_IMAGE_NAME -f ./build/Dockerfile.build .

# use the build image to compile a static binary and build an image using it
docker run --rm \
       -e VERSION=$VERSION \
       -v /var/run/docker.sock:/var/run/docker.sock \
       $BUILD_IMAGE_NAME \
       -t $IMAGE_NAME:$VERSION -f ./build/Dockerfile.release .

echo "Created image: $IMAGE_NAME:$VERSION"
