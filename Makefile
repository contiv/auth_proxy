# this is the classic first makefile target, and it's also the default target
# run when `make` is invoked with no specific target.
all: build

# build uses a build container to build a minimalist image which is suitable
# for releases. you can specify a BUILD_VERSION here, e.g., BUILD_VERSION=foo
# will build 'ccn_proxy:foo'. if you omit the BUILD_VERSION, it defaults to
# "devbuild".
build: checks
	@bash ./scripts/build.sh

# checks runs a script which runs gofmt, go vet, and other code quality tools.
checks:
	@bash ./scripts/checks.sh

# ci does everything necessary for a Github PR-triggered CI run.
# currently, this means building a container image and running
# all of the available tests. (systemtests require a container)
ci: build test

# generate-certificate generates a local key and cert for running the proxy.
# if an existing certificate and key exist, it will do nothing.
# if either of them do not exist, they will both be recreated.
generate-certificate:
	@bash ./scripts/generate-certificate.sh

# godep rebuilds Godeps/Godeps.json
# you will only need to run this if you add a new external dependency.
godep:
	[ -n "`which godep`" ] || go get -u github.com/tools/godep
	godep save ./...

# run builds the ccn_proxy image, generates a certificate if necessary, and runs
# the proxy using the local certificate.
run: build generate-certificate
	@bash ./scripts/run.sh

# systemtests runs the system tests suite.
systemtests:
	@bash ./scripts/systemtests.sh

# unittests runs all the unit tests
unit-tests:
	@bash ./scripts/unittests.sh

# test runs ALL the test suites.
test: systemtests unit-tests

.PHONY: all build checks ci generate-certificate godep run systemtests test unit-tests
