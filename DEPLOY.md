### Clone contiv-ui

Clone the contiv-ui repository using [git][git]:

```
git clone https://github.com/contiv/contiv-ui.git

Clone the netplugin repository using [git][git]:

```
git clone https://github.com/netplugin/netplugin.git


Set appropriate GOPATH

Modify Vagrantfile to forward guest port 80 to some other port say 9080

cd netplugin
make demo
vagrant ssh netplugin-node1

In netplugin-node1 do
cd $GOPATH/contiv-ui
docker build -t contiv-ui-nginx .
docker run --net=host --name contiv-ui -d contiv-ui-nginx

Access the UI using http://localhost:9080/

