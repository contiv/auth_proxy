all: build

build: checks
	go install github.com/contiv/ccn_proxy/ccn_proxy

checks:
	@bash ./scripts/checks.sh

.PHONY: all build checks
