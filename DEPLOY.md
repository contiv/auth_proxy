#### Step 1: Clone contiv-ui


```
$ git clone https://github.com/contiv/contiv-ui.git
```

#### Step 2: Clone the netplugin repository and bring up the VMs

```
$ git clone https://github.com/netplugin/netplugin.git
$ export GOPATH="<Your gopath>"
$ cd netplugin
```

Modify Vagrantfile to forward guest port 80 to some other port say 9080:

`node.vm.network "forwarded_port", guest: 80, host: 9080`

```
make demo
vagrant ssh netplugin-node1
```

#### Step 3: Deploy Contiv UI
```
$ cd $GOPATH/contiv-ui
$ docker build -t contiv-ui-nginx .
$ docker run --net=host --name contiv-ui -d contiv-ui-nginx
```
#### Step 4: Access UI using http://localhost:9080/

