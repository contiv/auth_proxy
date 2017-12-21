#Backend Design

##Developers - Table of contents
=================

  * [Overview](#overview)
  * [InfluxDB](#influxdb)
  * [Telegraf](#telegraf)
  * [telegrafdatasource.py](#telegrafdatasourcepy)
  * [Limitations](#limitations)

###Overview:
============
The backend is made up of multiple components. 
* telegrafdatasource.py: 
  * A python server that serves metadata to the front end, as well as acts as a middleware for converting data from Netplugin so that Telegraf can read it. 
  * It is run on all the nodes.
* Telegraf: 
  * Datacollector that scrapes the python server for data, and writes to influx. Runs on one node.
* InfluxDB: 
  * Timeseries DB that is used for storing data. Runs in a docker container.
* serviceInit.sh: 
  * Starts up two services, one with 14 containers, and another with 3, as well as 4 endpoint containers. Generates traffic using netcat. Based on the service example here: http://contiv.github.io/documents/networking/services.html. 
  * If run with "-c", creates another 3 endpoint containers. 
* backendConfig.sh: 
  * Generates the config file for Telegraf, telegraf.conf. Uses Contiv Netplugin's API to specify endpoints for Telegraf to query the python server with.
  * Installs and starts telegraf, and starts up Influx DB in a docker container.
* endpointExtract.py: 
  * Helper file for backendConfig.sh
  * Extracts all the endpoint IP containers for a given node IP. 
* configBase.conf: 
  * Basic telegraf config tempalte which backendConfig uses to generate telegraf.conf

###InfluxDB
============
* Timeseries DB that is used for storing data. Runs in a docker container.
* All recordings are stored with measurement as httpjson_svcstats.
* Field Keys are Bytes In, Bytes Out, Packets In, Packets Out.
* Tags are EndpointIP, ProviderIP, ServiceIP.
* For info on querying the database, see https://docs.influxdata.com/influxdb/v0.13/guides/querying_data/

###Telegraf
============
* Datacollector that writes to InfluxDB
* Uses the httpjson plugin to read in JSON data
  * The plugin has some limitations. It cannot read tags that are nested, as well as cannot perform multiple rights for one read. Due to this, it cannot currently handle an endpoint talking to multiple services on the same node, as well as is unable to read from the Contiv Netplugin API directly.
* The telegraf.conf configuration file has the python server with each endpoint as scraping points.


###telegrafdatasource.py
========================
* Python server that handles two requests.
  * When queried with the url route, "/services", it calls the Contiv Netplugin API to gather metadata for the front end. Returns a JSON object with the following keys:
    * ancestors_struct: {JSON} Maps container ids to the service it belongs to.
    * children_struct: {JSON} Maps service name to the containers it holds.
    * labels: {JSON} Maps container Id to a JSON that has its label mappings.
    * serviceSelectors: {JSON} Maps service name to a JSON that has its label selector mappings.
  * All other routes are assumed to be an endpoint container(ex. "/11.1.1.2"). It will use Contiv Netplugin's API and will look up this endpoint to get its traffic. Note that the endpoint being looked up must also be running on the same node as this server. This will return a JSON object that Telegraf can read and then write to InfluxDB. The JSON object has the following keys:
  	* EndpointIP: The endpoint IP
  	* ServiceIP: The Service IP it's connecting to.
  	* ProviderIP: The Provider IP it's connecting to.
  	* BytesIn: Bytes In from the Endpoint IP to the Provider IP
  	* BytesOut: Bytes Out from the Endpoint IP to the Provider IP
  	* PacketsIn: Packets In from the Endpoint IP to the Provider IP
  	* PacketsOut: Packets Out from the Endpoint IP to the Provider IP

###Limitations
===============
* Due to the limitations of the telegraf httpjson plugin, the backend cannot currently handle an endpoint talking to multiple services on the same node. Future plan is to write our own plugin for telegraf, or to build our own data aggregator. This will also eliminate the need for the python server



