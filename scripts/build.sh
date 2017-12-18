#!/bin/bash

set -euo pipefail

DEV_IMAGE_NAME="devbuild"
IMAGE_NAME="contiv/auth_proxy"
BUILD_IMAGE_NAME="${IMAGE_NAME}_build"
VERSION=${BUILD_VERSION-$DEV_IMAGE_NAME}

#
# bake in the UI assets
#
UI_DIR="$PWD/build/dependencies/contiv-ui"

mkdir -p $UI_DIR

# make sure we have a local checkout
echo "Checking to see if $UI_DIR/.git exists"

if [ ! -d "$UI_DIR/.git" ]; then
	echo "contiv-ui dependency directory does not exist, creating..."
	echo "Performing clone of contiv-ui repo into $UI_DIR"
	git clone --depth 1 https://github.com/contiv/contiv-ui.git $UI_DIR
fi

pushd $UI_DIR

# this is a fancy way to check if the var is set without tripping the unbound variable check
if [ ! -z "${BUILD_VERSION-}" ]; then
	echo "BUILD_VERSION is set ($BUILD_VERSION), checking it out as a tag..."

	git checkout master         # make sure we have the latest master + all tags
	git pull --ff-only          # no merge commits, please
	git fetch --tags            # shallow clones do not include tags, so doublecheck
	git checkout $BUILD_VERSION # BUILD_VERSION is expected to be a valid tag
else
	echo "No BUILD_VERSION set, skipping checkout/update of contiv-ui repo"
	echo "Whatever version is currently checked out in $UI_DIR directory will be baked in"
	echo "Current version: $(git rev-parse HEAD)"
fi

#
# build the final image
#
popd

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
find build/dependencies/contiv-ui/app/ -name '*.js' -not \
	-path "build/dependencies/contiv-ui/app/bower_components/semantic-ui/*" -exec gzip -9fk '{}' \;
find build/dependencies/contiv-ui/app/ -name '*.css' -not \
	-path "build/dependencies/contiv-ui/app/bower_components/semantic-ui/*" -exec gzip -9fk '{}' \;
docker build -t $IMAGE_NAME:$VERSION -f ./build/Dockerfile.release .
echo "Created image: $IMAGE_NAME:$VERSION"

rm -f ./build/output/auth_proxy
