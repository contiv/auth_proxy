all: build-image

# build-image uses a build container to build a minimalist image which is suitable for releases.
# you can specify a BUILD_VERSION here, e.g., BUILD_VERSION=foo will build 'ccn_proxy:foo'
# if you omit the BUILD_VERSION, it defaults to "devbuild".
build-image: checks
	@bash ./scripts/build-image.sh

# checks invokes a script which runs gofmt, go vet, and other code quality tools
checks:
	@bash ./scripts/checks.sh

# generate-certificate generates a local key and x509 cert for running the proxy
# if an existing certificate and key exist, it will do nothing
generate-certificate:
	@bash ./scripts/generate-certificate.sh

# godep rebuilds Godeps/Godeps.json
godep:
	godep save ./...

# run-local builds the ccn_proxy image, generates a certificate if necessary, and runs the proxy
# using the local certificate
run-local: build-image generate-certificate
	@echo "================================================================================"
	@docker run --rm \
		-v $$PWD:/code ccn_proxy:devbuild \
		--tls-key-file=/code/local.key \
		--tls-certificate=/code/cert.pem

.PHONY: all build-image checks generate-certificate godep
