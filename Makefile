all: build

build: checks
	go install github.com/contiv/rbac_proxy/rbac_proxy

checks:
	@bash ./scripts/checks.sh

.PHONY: all build checks
