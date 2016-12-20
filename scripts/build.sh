#!/bin/bash

set -euo pipefail

DEV_IMAGE_NAME="devbuild"
IMAGE_NAME="ccn_proxy"
BUILD_IMAGE_NAME="${IMAGE_NAME}_build"
VERSION=${BUILD_VERSION-$DEV_IMAGE_NAME}

#
# bake in the  UI assets
#
START_DIR=$(pwd)
echo "START_DIR: ${START_DIR}"
UI_DIR="$PWD/build/dependencies/contiv-ui"

mkdir -p $UI_DIR

# make sure we have a local checkout
echo "Checking to see if $UI_DIR/.git exists"

if [ ! -d "$UI_DIR/.git" ]; then
    echo "contiv-ui dependency directory does not exist, creating..."
    echo "Performing clone of contiv-ui repo into $UI_DIR"
    git clone git@github.com:contiv/contiv-ui.git $UI_DIR
fi

# this is a fancy way to check if the var is set without tripping the unbound variable check
if [ ! -z "${BUILD_VERSION-}" ]; then
    echo "BUILD_VERSION is set ($BUILD_VERSION), checking it out as a tag..."

    cd $UI_DIR
    git checkout master # make sure we have the latest master + all tags
    git pull --ff-only # no merge commits, please
    git checkout $BUILD_VERSION # BUILD_VERSION is expected to be a valid tag
else
    echo "No BUILD_VERSION set, skipping checkout/update of contiv-ui repo"
    echo "Whatever version is currently checked out in $UI_DIR directory will be baked in"
    echo "Current version: $(git rev-parse HEAD)"
fi

cd $START_DIR

# create a local build image
docker build -t $BUILD_IMAGE_NAME -f ./build/Dockerfile.build .

# use the build image to compile a static binary and build an image using it
docker run --rm \
       -e VERSION=$VERSION \
       -v /var/run/docker.sock:/var/run/docker.sock \
       $BUILD_IMAGE_NAME \
       -t $IMAGE_NAME:$VERSION -f ./build/Dockerfile.release .

echo "Created image: $IMAGE_NAME:$VERSION"
