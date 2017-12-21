from BaseHTTPServer import BaseHTTPRequestHandler,HTTPServer
import urllib2
import json
import sys


PORT_NUMBER = 4000

#This class will handles any incoming request from
#the browser 
class myHandler(BaseHTTPRequestHandler):
	
	def labelParser(self, labels):
		#first 4 char are map[ and last is ]
		labelMap = {}
		labels = labels[4:-1]
		labels = labels.split()
		for l in labels:
			index = l.find(':')
			key = l[0:index]
			val = l[index+1:]
			labelMap[key] = val
		return labelMap


	#Handler for the GET requests
	def do_GET(self):
		svcstats = urllib2.urlopen("http://localhost:9090/svcstats").read()
		svcstatsjson = json.loads(str(svcstats))
		self.send_response(200)
		self.send_header('Content-type','application/json')
		self.end_headers()
		if ('/services' in self.path):
			serviceInspectNames = []

			services = urllib2.urlopen("http://localhost:9999/api/v1/serviceLBs/").read()
			for s in json.loads(services):
				name = str(s["tenantName"]) + ':' + str(s["serviceName"])
				serviceInspectNames.append(name)
			# #inspect each service
			childrenServiceDict = {}
			childrenServiceDict["topLevel"] = []
			ancestorServiceDict = {}
			providers = []
			labelMap = {}
			selectorMap = {}

			for serviceName in serviceInspectNames:
				service = urllib2.urlopen("http://localhost:9999/api/v1/inspect/serviceLBs/" + serviceName + '/').read()
				serviceJson = json.loads(service)

				#getting selectors
				selectorMapLocal = {}
				for selector in serviceJson["Config"]["selectors"]:
					index = selector.find('=')
					key = selector[0:index]
					val = selector[index+1:]
					selectorMapLocal[key] = val
				selectorMap[serviceName] = selectorMapLocal

				oper = serviceJson["Oper"]
				providerList = oper.get("providers", []);
				ipAddrs = []
				for provider in providerList:
					for p in provider["ipAddress"]:
						if p != "":
							if p not in providers:
								providers.append(str(p))
								labelMap[p] = self.labelParser(provider["labels"])
							ipAddrs.append(str(p))
							ancestorServiceDict[str(p)] = [serviceName]
				childrenServiceDict[serviceName] = ipAddrs
				childrenServiceDict["topLevel"].append(serviceName)
			ret = {}
			ret["ancestors_struct"] = ancestorServiceDict
			ret["children_struct"] = childrenServiceDict
			ret["labels"] = labelMap
			ret["serviceSelectors"] = selectorMap
			self.wfile.write(json.dumps(ret))
		else:
			endpointKey = self.path[1:];
			endpointItem = None
			for item in svcstatsjson:
				if item['EndpointIP'] == endpointKey:
					endpointItem = item
					break
			ret = {}
			ret["EndpointIP"] = str(endpointItem["EndpointIP"])
			#no point in checking for more services right now, as
			#telegraf http-json plugin can't handle multiple writes for a single 
			#scrape
			ret["ServiceIP"] = str(endpointItem["SvcStats"].keys()[0])
			service = ret["ServiceIP"];
			providerStats = endpointItem["SvcStats"][service]["ProvStats"]
			#finding which of the two keys is provider key
			#currently merging the stats to create bytes in and bytes out
			#for a pair, not individually
			providerKeys = providerStats.keys()
			ret['ProviderIP'] = str(providerKeys[0]);
			if ret['ProviderIP'] == ret['EndpointIP']:
				ret['ProviderIP'] = str(providerKeys[1])
			ret["BytesIn"] = int(providerStats[ret['ProviderIP']]['BytesIn'])
			ret["PacketsIn"] = int(providerStats[ret['ProviderIP']]['PacketsIn'])
			ret["BytesOut"] = int(providerStats[ret['EndpointIP']]['BytesOut'])
			ret["PacketsOut"] = int(providerStats[ret['EndpointIP']]['PacketsOut'])
			self.wfile.write(json.dumps(ret))
		return

try:
	#Create a web server and define the handler to manage the
	#incoming request
	server = HTTPServer(('', PORT_NUMBER), myHandler)
	print 'Started httpserver on port ' , PORT_NUMBER
	
	#Wait forever for incoming htto requests
	server.serve_forever()

except KeyboardInterrupt:
	print '^C received, shutting down the web server'
	server.socket.close()





