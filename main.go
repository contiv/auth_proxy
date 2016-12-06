package main

import (
	"flag"
	"time"

	"github.com/contiv/ccn_proxy/common"
	"github.com/contiv/ccn_proxy/proxy"
	"github.com/contiv/ccn_proxy/usermgmt"

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

func main() {

	log.Println(ProgramName, ProgramVersion, "starting up...")

	processFlags()

	if debug {
		log.SetLevel(log.DebugLevel)
	}

	// Initialize data store
	if err := common.InitializeStateDriver(dataStoreAddress); err != nil {
		log.Fatalln(err)
		return
	}

	// Add default users to the system
	if err := usermgmt.AddDefaultUsers(); err != nil {
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
