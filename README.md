# Setup contiv-ui with contiv cluster on linux server
#### Step 1: Clone contiv-ui


```
$ git clone https://github.com/contiv/contiv-ui.git
```

#### Step 2: Clone the cluster repository and bring up the VMs

```
$ git clone https://github.com/contiv/cluster.git
$ export GOPATH="<Your gopath>"
$ cd cluster
```

Modify Vagrantfile to forward netmaster and cluster ports:

```
node.vm.network "forwarded_port", guest: 9007, host:9007
node.vm.network "forwarded_port", guest: 9999, host:9999
```

```
$ make demo
```

#### Step 3: Deploy Contiv UI as a nginx container on linux server
```
$ cd $GOPATH/contiv-ui
$ docker build -t contiv-ui-nginx .
$ docker run --net=host --name contiv-ui -d contiv-ui-nginx
```
#### Step 4: Access UI using http://\<hostname\>/
