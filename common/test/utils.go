package test

import (
	"os"
	"os/exec"
	"strings"

	log "github.com/Sirupsen/logrus"
)

// EmptyDatastore clears the contents of the specified datastore.
// This will ensure a clean slate for each test that runs.
// In some cases, the delete command will return a non-zero exit code (e.g., if
// the datastore is already empty), so we'll use "|| true" to ignore failures.
// params:
//  addr: address of the datastore, e.g., "etcd://w.x.y.z:2379"
func EmptyDatastore(addr string) {
	switch {
	case strings.HasPrefix(addr, "etcd://"):
		cmd := "docker exec " + os.Getenv("ETCD_CONTAINER_NAME") + " /etcdctl rm --recursive /ccn_proxy || true"
		log.Debugln("Emptying datastore:", cmd)

		if err := exec.Command("/bin/sh", "-c", cmd).Run(); err != nil {
			log.Fatalln("Failed to clear etcd: ", err)
		}
	case strings.HasPrefix(addr, "consul://"):
		// NOTE: consul keys do not start with a /
		cmd := "docker exec " + os.Getenv("CONSUL_CONTAINER_NAME") + " consul kv delete -recurse ccn_proxy || true"
		log.Debugln("Emptying datastore:", cmd)

		if err := exec.Command("/bin/sh", "-c", cmd).Run(); err != nil {
			log.Fatalln("Failed to clear consul: ", err)
		}
	default:
		log.Fatalln("Unknown data store for address:", addr)
	}
}
