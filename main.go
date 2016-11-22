package main

import (
	"errors"
	"flag"
	"strings"
	"time"

	"github.com/contiv/ccn_proxy/common"
	"github.com/contiv/ccn_proxy/common/types"
	"github.com/contiv/ccn_proxy/proxy"

	log "github.com/Sirupsen/logrus"
)

var (
	// flags
	debug            bool   // if set, log level is set to `debug`
	listenAddress    string // address we listen on
	netmasterAddress string // address of the netmaster we proxy to
	dataStoreAddress string // address of the data store used by netmaster
	tlsKeyFile       string // path to TLS key
	tlsCertificate   string // path to TLS certificate

	// ProgramName is used in logging output and the X-Forwarded-By header.
	ProgramName = "CCN Proxy"

	// ProgramVersion is used in logging output and the X-Forwarded-By header.
	// it is overridden at compile time via -ldflags
	ProgramVersion = "unknown"
)

func processFlags() {
	// TODO: add a flag for LDAP host + port
	flag.StringVar(
		&listenAddress,
		"listen-address",
		":9999",
		"address to listen to HTTP requests on",
	)
	flag.StringVar(
		&netmasterAddress,
		"netmaster-address",
		"localhost:9998",
		"address of the upstream netmaster",
	)
	flag.StringVar(
		&tlsKeyFile,
		"tls-key-file",
		"local.key",
		"path to TLS key",
	)
	flag.StringVar(
		&tlsCertificate,
		"tls-certificate",
		"cert.pem",
		"path to TLS certificate",
	)
	flag.BoolVar(
		&debug,
		"debug",
		false,
		"if set, log level is set to debug",
	)
	flag.StringVar(
		&dataStoreAddress,
		"data-store-address",
		"",
		"address of the state store used by netmaster",
	)
	flag.Parse()
}

// initializeStateDriver initializes the state driver based on the given data store address
// params:
//  dataStoreAddress: address of the data store
// return values:
//  returns any error as NewStateDriver() + validation errors
func initializeStateDriver(dataStoreAddress string) error {
	if common.IsEmpty(dataStoreAddress) {
		return errors.New("Empty data store address")
	}

	if strings.HasPrefix(dataStoreAddress, common.EtcdName+"://") {
		_, err := common.NewStateDriver(common.EtcdName, &types.KVStoreConfig{StoreURL: dataStoreAddress})
		return err
	} else if strings.HasPrefix(dataStoreAddress, common.ConsulName+"://") {
		_, err := common.NewStateDriver(common.ConsulName, &types.KVStoreConfig{StoreURL: dataStoreAddress})
		return err
	}

	return errors.New("Invalid data store address")
}

func main() {

	log.Println(ProgramName, ProgramVersion, "starting up...")

	processFlags()

	if debug {
		log.SetLevel(log.DebugLevel)
	}

	if err := initializeStateDriver(dataStoreAddress); err != nil {
		log.Fatalln(err)
		return
	}

	p := proxy.NewServer(&proxy.Config{
		Name:             ProgramName,
		Version:          ProgramVersion,
		NetmasterAddress: netmasterAddress,
		ListenAddress:    listenAddress,
		TLSCertificate:   tlsCertificate,
		TLSKeyFile:       tlsKeyFile,
	})

	go p.Serve()

	for range time.Tick(time.Second) {
	}
}
