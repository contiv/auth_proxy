package main

import (
	"flag"
	"os"
	"time"

	"github.com/contiv/ccn_proxy/common"
	"github.com/contiv/ccn_proxy/proxy"
	"github.com/contiv/ccn_proxy/usermgmt"

	log "github.com/Sirupsen/logrus"
)

var (
	// flags
	dataStoreAddress string // address of the data store used by netmaster
	debug            bool   // if set, log level is set to `debug`
	listenAddress    string // address we listen on
	netmasterAddress string // address of the netmaster we proxy to
	initialSetup     bool   // if set, run the initial proxy setup (adding default users, etc.)
	tlsKeyFile       string // path to TLS key
	tlsCertificate   string // path to TLS certificate

	// ProgramName is used in logging output and the X-Forwarded-By header.
	ProgramName = "CCN Proxy"

	// ProgramVersion is used in logging output and the X-Forwarded-By header.
	// it is overridden at compile time via -ldflags
	ProgramVersion = "unknown"
)

func performInitialSetup() {
	log.Println("Performing initial setup")

	log.Println("Adding default users with default passwords")
	if err := usermgmt.AddDefaultUsers(); err != nil {
		log.Fatalln(err)
		// exit with a non-zero error code.
		// this can be used by installers, etc. to determine whether the
		// setup successfully completed or not.
		os.Exit(1)
	}

	log.Println("Initial setup is complete.  Exiting.")
	os.Exit(0)
}

func processFlags() {
	// TODO: add a flag for LDAP host + port

	flag.BoolVar(
		&initialSetup,
		"initial-setup",
		false,
		"if set, run the initial proxy setup (adding default users, etc.)",
	)
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

	// if --initial-setup is specified, just perform setup and exit immediately
	if initialSetup {
		performInitialSetup()
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
