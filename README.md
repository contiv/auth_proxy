# Setup contiv-ui with contiv netmaster

#### Step 1: Clone the netplugin repository and bring up the VMs

```sh
git clone https://github.com/contiv/netplugin.git
export GOPATH="<Your gopath>"
cd netplugin
```
Modify Vagrantfile to forward etcd port:
```
node.vm.network "forwarded_port", guest: 2379, host:2379
```
```sh
make demo
```

#### Step 2: Clone contiv-ui
```sh
git clone https://github.com/contiv/contiv-ui.git
```

#### Step 3: Deploy Contiv UI as a Auth Proxy container.

* Checkout 'contiv/auth_proxy'
  * Inside the 'auth_proxy' checkout:
```sh
git pull # if you need to refresh the checkout
make
make generate-certificate # if this is a new checkout
```
* Also, set an env var pointing to the local UI src code:
```sh
export UI_DIR='/Users/john/Dev/gocode/src/github.com/contiv/contiv-ui/app'
```

* Load the auth\_proxy as a container. Note where in this CLI there is a reference to the data store and netmaster:
```sh
docker run -it \
	-v $PWD/local_certs:/local_certs:ro \
	-v $UI_DIR:/ui:ro \
	-p 10000:10000 contiv/auth_proxy:devbuild --listen-address=0.0.0.0:10000  \
	--netmaster-address=localhost:9999 \
	--data-store-address=etcd://localhost:2379 \
	--tls-certificate=/local_certs/cert.pem --tls-key-file=/local_certs/local.key
```

#### Step 4: Access UI using https://localhost:10000/
