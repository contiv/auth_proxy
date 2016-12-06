package test

import (
	"os"
	"os/exec"
	"strings"

	log "github.com/Sirupsen/logrus"
	"github.com/contiv/ccn_proxy/common"
)

// GetDatastore returns the value of `os.Getenv("USE_DATASTORE")` or `etcd` by default
func GetDatastore() string {
	datastore := strings.TrimSpace(os.Getenv("USE_DATASTORE"))
	if !common.IsEmpty(datastore) {
		return datastore
	}

	return common.EtcdName
}

// GetDatastoreAddress returns the data store address; mainly used for testing.
// return values:
//  string: value of `os.Getenv("USE_DATASTORE_ADDRESS")` or default data store address of `etcd/consul`(from GetDatastore())
//  if datastore is running in different IP/port, it needs to be explicly set in `USE_DATASTORE_ADDRESS` otherwise the tests will FAIL
func GetDatastoreAddress() string {
	datastoreAddr := strings.TrimSpace(os.Getenv("USE_DATASTORE_ADDRESS"))
	if !common.IsEmpty(datastoreAddr) {
		return datastoreAddr
	}

	switch GetDatastore() {
	case common.EtcdName:
		return "etcd://127.0.0.1:2379"
	case common.ConsulName:
		return "consul://127.0.0.1:8500"
	default:
		return ""
	}
}

// CleanupDatastore deletes all the given path and its contents from the data store.
// This will ensure clean slate for the tests.
// params:
//  dsName: name of the datastore; etcd/consul
//  path: list of path to be deleted recursively
func CleanupDatastore(dsName string, paths []string) {
	log.Info("Cleaning data store...")

	switch dsName {
	case common.EtcdName:
		for _, path := range paths {
			log.Infof("Cleaning %q", path)

			// if the datastore is running locally
			_, err := exec.Command("/bin/sh", "-c", "etcdctl rm --recursive "+path).Output()
			if err != nil {
				// check the container is running; if so, clear etcd
				containerID, _ := exec.Command("/bin/sh", "-c", "echo * | docker ps | grep etcd |  cut -d ' ' -f1").Output()
				contID := string(containerID)

				if !common.IsEmpty(contID) {
					cmd := "docker exec " + strings.TrimSpace(contID) + " /etcdctl rm --recursive " + path
					exec.Command("/bin/sh", "-c", cmd).Run()
				}
			}
		}
	case common.ConsulName:
		for _, path := range paths {
			log.Infof("Cleaning %q", path)

			// if the datastore is running locally
			_, err := exec.Command("/bin/sh", "-c", "consul kv delete  -recurse "+path).Output()
			if err != nil {
				// check the container is running; if so, clear consul
				containerID, _ := exec.Command("/bin/sh", "-c", "echo * | docker ps | grep consul |  cut -d ' ' -f1").Output()
				contID := string(containerID)

				if !common.IsEmpty(contID) {
					cmd := "docker exec " + strings.TrimSpace(contID) + " consul kv delete -recurse " + path
					exec.Command("/bin/sh", "-c", cmd).Run()
				}
			}
		}
	default:
		log.Fatalln("Invalid data store")
	}
}
