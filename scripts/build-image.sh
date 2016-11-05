#!/bin/bash

set -euo pipefail

IMAGE_NAME="ccn_proxy"
BUILD_IMAGE_NAME="${IMAGE_NAME}_build"
VERSION=${BUILD_VERSION-devbuild}

# create a local build image
docker build -t $BUILD_IMAGE_NAME -f ./build/Dockerfile.build .

# use the local build image to compile a static binary
docker run --rm -v $GOPATH:/go -v $PWD/build/output:/output $BUILD_IMAGE_NAME

# create the final container image with the static binary
docker build -t $IMAGE_NAME:$VERSION -f ./build/Dockerfile .

cat <<-EOF
	Created image: $IMAGE_NAME:$VERSION

	Test it with:

	make run-local

	OR

	docker run --rm -v \$PWD:/code ccn_proxy:devbuild --tls-key-file=/code/local.key --tls-certificate=/code/cert.pem
EOF
