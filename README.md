# Setup contiv-ui with contiv netmaster

#### Step 1: Clone the netplugin repository and bring up the VMs

```
$ git clone https://github.com/contiv/netplugin.git
$ export GOPATH="<Your gopath>"
$ cd netplugin
```
Modify Vagrantfile to forward etcd port:
```
node.vm.network "forwarded_port", guest: 2379, host:2379
```
```
$ make demo
```

#### Step 2: Clone contiv-ui
```
$ git clone https://github.com/contiv/contiv-ui.git
```

#### Step 3: Deploy Contiv UI as a CCN Proxy container.

* Checkout 'contiv/ccn_proxy'
  * Inside the 'ccn_proxy' checkout:
```
	git pull <-- if you need to refresh the checkout
	make
	make generate-certificate <-- if this is a new checkout
```
* Also, set an env var pointing to the local UI src code:
```
	export UI_DIR='/Users/john/Dev/gocode/src/github.com/contiv/contiv-ui/app'
```

* Load the cnn_proxy as a container. Note where in this CLI there is a reference to the data store and netmaster:
```
docker run -it \
-v $PWD/local_certs:/local_certs:ro \
-v $UI_DIR:/ui:ro \
-p 10000:10000 ccn_proxy:devbuild --listen-address=0.0.0.0:10000  \
--netmaster-address=<netmaster>:9999 \
--data-store-address=etcd://<netmaster>:2379 \
--tls-certificate=/local_certs/cert.pem --tls-key-file=/local_certs/local.key
```

#### Step 4: Access UI using http://localhost:10000/
