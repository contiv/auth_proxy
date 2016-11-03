all: build

build: checks
	go install \
		-ldflags '-X main.version=$(if ${BUILD_VERSION},${BUILD_VERSION},devbuild)' \
		github.com/contiv/ccn_proxy/ccn_proxy

checks:
	@bash ./scripts/checks.sh

.PHONY: all build checks
