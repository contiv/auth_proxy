all: build-image

build-image: checks
	@bash ./scripts/build-image.sh

checks:
	@bash ./scripts/checks.sh

godep:
	godep save ./...

.PHONY: all build-image checks godep
