#!/bin/bash
if [ -z "$OLD_VERSION" ]; then
    echo "A release requires OLD_VERSION to be defined"
    exit 1
fi

if [ "$OLD_VERSION" != "none" ]; then
    comparison="$OLD_VERSION..HEAD"
fi
pre_release="-p"

if [ "$OLD_VERSION" != "none" ];  then
    changelog=$(git log $comparison --oneline --no-merges --reverse)

    if [ -z "$changelog" ]; then
        echo "No new changes to release!"
        exit 0
    fi
else
    changelog="don't forget to update the changelog"
fi

set -x
( ( github-release -v release $pre_release -r auth_proxy -t $BUILD_VERSION -d "**Changelog**<br/>$changelog" ) ) || exit 1
