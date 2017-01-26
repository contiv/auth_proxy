#!/bin/bash

set -euo pipefail

DEV_IMAGE_NAME="devbuild"
IMAGE_NAME="contiv/auth_proxy"
BUILD_IMAGE_NAME="${IMAGE_NAME}_build"
VERSION=${BUILD_VERSION-$DEV_IMAGE_NAME}

#
# bake in the  UI assets
#
START_DIR=$(pwd)
UI_DIR="$PWD/build/dependencies/contiv-ui"
NODE_VERSION="7.4.0"

mkdir -p $UI_DIR

# make sure we have a local checkout
echo "Checking to see if $UI_DIR/.git exists"

if [ ! -d "$UI_DIR/.git" ]; then
    echo "contiv-ui dependency directory does not exist, creating..."
    echo "Performing clone of contiv-ui repo into $UI_DIR"
    git clone git@github.com:contiv/contiv-ui.git $UI_DIR
fi

cd $UI_DIR

# this is a fancy way to check if the var is set without tripping the unbound variable check
if [ ! -z "${BUILD_VERSION-}" ]; then
    echo "BUILD_VERSION is set ($BUILD_VERSION), checking it out as a tag..."

    git checkout master # make sure we have the latest master + all tags
    git pull --ff-only # no merge commits, please
    git checkout $BUILD_VERSION # BUILD_VERSION is expected to be a valid tag
else
    echo "No BUILD_VERSION set, skipping checkout/update of contiv-ui repo"
    echo "Whatever version is currently checked out in $UI_DIR directory will be baked in"
    echo "Current version: $(git rev-parse HEAD)"
fi

#
# run `npm install` to prepare the UI if it's changed since the last time we ran it
#
newest_commit=$(git rev-parse HEAD)
last_commit_file="../.last_npm_installed_ui_commit"

if [ ! -f "$last_commit_file" ] || [ $(cat $last_commit_file) != "$newest_commit" ]; then
    echo "Running 'npm install' for commit ${newest_commit}..."

    docker run --rm \
	   -u "$(id -u)" \
	   -v $(pwd):/contiv-ui \
	   -w /contiv-ui \
	   -it \
	   node:$NODE_VERSION npm install

    echo "Updating $last_commit_file with $newest_commit"
    echo "$newest_commit" > $last_commit_file
else
    echo "No need to run npm for this commit ($newest_commit)"
fi

#
# build the final image
#
cd $START_DIR

# ensure base has been built
docker build -t "auth_proxy_build_base" -f ./build/Dockerfile.base .

# create a local build image
docker build -t $BUILD_IMAGE_NAME -f ./build/Dockerfile.build .

# use the build image to compile a static binary and build an image using it
docker run --rm \
       -e IMAGE_NAME="$IMAGE_NAME" \
       -e VERSION="$VERSION" \
       -v /var/run/docker.sock:/var/run/docker.sock \
       $BUILD_IMAGE_NAME

echo "Created image: $IMAGE_NAME:$VERSION"
