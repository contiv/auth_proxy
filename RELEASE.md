# Automated releases
TBD

# Manual releases
1. Set BUILD_VERSION, e.g. 1.0.0-beta.3. Ensure this tag exists for contiv-ui repo, else step 2 will fail.

	```
	export BUILD_VERSION=<build version>
	```

2. Build docker binary image. This would create a docker image contiv/auth_proxy:$BUILD_VERSION.

	```
	make build
	```
2. Execute scripts/release.sh. Creates a new release on GitHub.

	```
	export GITHUB_USER=contiv
	export GITHUB_TOKEN=<your token here>
	./scripts/release.sh
	```
3. Push image to docker hub.

	```
	docker login -u $docker_user -p $docker_password
	docker push contiv/auth_proxy:$BUILD_VERSION
	```
