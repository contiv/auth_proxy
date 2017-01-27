#!/bin/bash

set -euo pipefail

if [[ -x "$(command -v getenforce)" && "$(getenforce)" == "Enforcing" ]]; then
    echo >&2  "SELinux is currently in enforcing mode.  This build script will not successfully execute."
    echo >&2 "You can temporarily disable SELinux via \`setenforce 0\` and reenable it with \`setenforce 1\`."
    echo >&2 "Exiting."

    exit 1
fi

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

    set -x

    # when `npm install` runs inside the container for the first time, it will
    # create a directory called node_modules.  subsequent runs can create subdirs
    # inside that directory.  these will all be owned by root:root (on linux) since
    # that's the user the container runs as.  this causes issues when checking out
    # different tags and during other git operations.
    #
    # in order to get around this issue without resorting to `sudo` on the local
    # machine to change ownership, we do the following:
    #
    # 1. start a npm container with a tty + bash entrypoint so it doesn't auto-exit
    # 2. run the `npm install` command inside the container
    # 3. chown everything in the bindmounted contiv-ui folder to have the same (linux only)
    #    user/group as the user invoking this script
    # 4. destroy the container
    #
    # TODO: come up with a better solution for this
    #
    npm_container_id=$(docker run -d -v $(pwd):/contiv-ui -w /contiv-ui -t --entrypoint bash node:$NODE_VERSION)
    docker exec $npm_container_id npm install

    # only need to run chown on linux systems
    if [ "`uname`" == "Linux" ]; then
	docker exec $npm_container_id chown -R "$(id -u):$(id -g)" .
    fi

    docker rm -f -v $npm_container_id

    set +x

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
