build:
	@docker run -it -u $$(id -u):$$(id -g) --rm -v ${PWD}:/contiv-ui contiv-ui-builder || \
  	echo "If you have not run the build task before, please run `make build-builder` first. "

dev-build:
	@docker run -it -u $$(id -u):$$(id -g) --rm -v ${PWD}:/contiv-ui contiv-ui-builder gulp dev-build || \
		echo "If you have not run the build task before, please run `make build-builder` first. "

build-builder:
	docker build -t contiv-ui-builder -f Dockerfile.build .

build-nginx:
	docker build -t contiv-ui-nginx .

run: build build-nginx
	@docker rm -f contiv-ui-nginx || :
	docker run --name contiv-ui-nginx --net host -itd contiv-ui-nginx
