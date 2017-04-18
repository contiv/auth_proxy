# Automated releases
TBD

# Manual releases
1. Check out the right branch and the right commit. This is necessary
when not releasing from the HEAD of master.

2. Tag the right commit and push it to GitHub. This is mandatory if the
release isn't made from the HEAD of master.
	```
	git tag 1.0.1 3aba546aea1235
	git push origin 1.0.1
	```

3. Set BUILD_VERSION, e.g. 1.0.0-beta.3. Ensure this tag exists for contiv-ui repo, else step 2 will fail.

	```
	export BUILD_VERSION=<build version>
	```

4. Build docker binary image. This would create a docker image contiv/auth_proxy:$BUILD_VERSION.

	```
	make build
	```
5. Execute scripts/release.sh. Creates a new release on GitHub.

	```
	export GITHUB_USER=contiv
	export GITHUB_TOKEN=<your token here>
	./scripts/release.sh
	```
6. Push image to docker hub.

	```
	docker login -u $docker_user -p $docker_password
	docker push contiv/auth_proxy:$BUILD_VERSION
	```
