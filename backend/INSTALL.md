#Installing and setting up the backend

##Step 1: Fowarding ports
Modify Vagrantfile to forward python server and Influx ports.
```
node.vm.network "forwarded_port", guest: 4000, host: 4000
node.vm.network "forwarded_port", guest: 8086, host: 8086
```
In the nginx.conf file, add the following location directives:
```
location /visualization/influx/{
    proxy_pass http://contiv215:8086/;
}
location /visualization/service {
    proxy_pass http://contiv215:4000;
}
```

##Step 2: Setup containers and services
If you have no containers running, you can run serviceInit.sh to start some sample services.
On Node 1:
```
$ ./serviceInit.sh
```
And to add endpoint containers on other nodes:
```
./serviceInit.sh -c
```

##Step 3: Setting up the python servers
On all nodes, run:
```
$ python telegrafdatasource.py
```

##Step 4: Installing and Running telegraf and InfluxDB:
On Node 1:
```
$ sudo ./backendConfig.sh
```
