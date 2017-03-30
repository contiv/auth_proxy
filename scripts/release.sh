#!/bin/bash

if [ -z "$(which github-release)" ]; then
	echo "Please install github-release before running this script"
	echo "You may download a release from https://github.com/aktau/github-release/releases or run 'go get github.com/aktau/github-release' if you have Go installed"
	exit 1
fi

if [ -z "$OLD_VERSION" ]; then
	echo "A release requires OLD_VERSION to be defined"
	exit 1
fi

if [ "$OLD_VERSION" != "none" ]; then
	comparison="$OLD_VERSION..HEAD"
fi
pre_release="-p"

if [ "$OLD_VERSION" != "none" ]; then
	changelog=$(git log $comparison --oneline --no-merges --reverse)

	if [ -z "$changelog" ]; then
		echo "No new changes to release!"
		exit 0
	fi
else
	changelog="don't forget to update the changelog"
fi

set -x
( (github-release -v release $pre_release -r auth_proxy -t $BUILD_VERSION -d "**Changelog**<br/>$changelog")) || exit 1
