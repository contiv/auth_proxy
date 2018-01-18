#Takes in the IP address for which to call svcstats
#iterates through JSON keys for the endpoints, and returns them

import json
import urllib2
import sys

def extract(arg):
	arg = arg.strip('\n')
	if (arg == ""):
		return
	url = arg + ":9090/svcstats"
	res = urllib2.urlopen(url).read()
	parsed = json.loads(str(res))
	for item in parsed:
		key = item['EndpointIP']
		print('"' + arg + ':4000/' + key + '",')
	return
# print sys.stdin.read()
extract(sys.argv[1])
