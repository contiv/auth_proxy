package main

import (
	"flag"
	"fmt"
	"os"
	"runtime"
	"syscall"

	"github.com/blang/semver"
	"github.com/contiv/auth_proxy/auth"
	"github.com/contiv/auth_proxy/common"
	"github.com/contiv/auth_proxy/proxy"
	"github.com/contiv/auth_proxy/state"

	log "github.com/Sirupsen/logrus"
)

const (
	// DefaultVersion is the version string used when a BUILD_VERSION is not passed to the build.
	DefaultVersion = "devbuild"
)

var (
	// flags
	dataStoreAddress string // address of the data store used by netmaster
	debug            bool   // if set, log level is set to `debug`
	listenAddress    string // address we listen on
	netmasterAddress string // address of the netmaster we proxy to
	tlsKeyFile       string // path to TLS key
	tlsCertificate   string // path to TLS certificate

	// ProgramName is used in logging output and the X-Forwarded-By header.
	ProgramName = "Auth Proxy"

	// ProgramVersion is used in logging output and the X-Forwarded-By header.
	// it is overridden at compile time via -ldflags
	ProgramVersion = DefaultVersion

	// the three timeouts we support.  See proxy.Config for comments
	netmasterRequestTimeout int64
	clientReadTimeout       int64
	clientWriteTimeout      int64
)

func processFlags() {
	flag.Int64Var(
		&netmasterRequestTimeout,
		"netmaster-timeout",
		proxy.DefaultNetmasterRequestTimeout,
		"time (in seconds) to allow auth_proxy to spend forwarding a request to netmaster",
	)

	flag.Int64Var(
		&clientReadTimeout,
		"client-read-timeout",
		proxy.DefaultClientReadTimeout,
		"time (in seconds) to allow a client to send its complete request to auth_proxy",
	)

	flag.Int64Var(
		&clientWriteTimeout,
		"client-write-timeout",
		proxy.DefaultClientWriteTimeout,
		"time (in seconds) to allow for auth_proxy to send a response after receiving a request from a client",
	)

	flag.StringVar(
		&listenAddress,
		"listen-address",
		":10000",
		"address to listen to HTTP requests on",
	)

	flag.StringVar(
		&netmasterAddress,
		"netmaster-address",
		"localhost:9999",
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

// We perform two checks here:
//   1. that the version of the netmaster we're pointed at is a compatible version,
//      i.e., its major version is the same and the minor version of netmaster is
//      greater than or equal to the minor version of auth_proxy.
//   2. by nature of 1., that the netmaster is actually reachable at all
//
// If this is a devbuild (i.e., build version = default version), we will still
// ensure that netmaster is reachable but we won't check its version.
func netmasterStartupCheck() error {

	// this envvar is used by systemtests to get around the fact that auth_proxy
	// expects netmaster to have already been started, but the actual systemtests
	// code (which runs the MockServer) is started *after* the proxy containers are
	// started so that it can receive the IPs/ports of the proxy containers.
	//
	// we won't be advertising this envvar in our docs or anywhere else.
	if len(os.Getenv("NO_NETMASTER_STARTUP_CHECK")) != 0 {
		log.Println("Skipping netmaster startup check")
		return nil
	}

	log.Info("Testing connectivity to netmaster at " + netmasterAddress)

	netmasterVersion, err := common.GetNetmasterVersion(netmasterAddress)
	if err != nil {
		return err
	}

	log.Infof("Found netmaster version '%s'", netmasterVersion)

	// if this is a dev build, just exit
	if DefaultVersion == ProgramVersion {
		log.Infof("%s version is default (%s), skipping netmaster version compatibility check",
			ProgramName,
			DefaultVersion,
		)
		return nil
	}

	// this envvar is useful for running systemtests against an arbitrary
	// version of netmaster while still ensuring netmaster is up.
	if len(os.Getenv("NO_NETMASTER_SEMVER_CHECK")) != 0 {
		log.Println("Skipping netmaster semver check")
		return nil
	}

	// compare the semvers of the proxy and netmaster
	// (only major and minor, we will allow patch level differences)
	proxyVer, err := semver.Make(ProgramVersion)
	if err != nil {
		return fmt.Errorf(
			"failed to create semver from proxy version '%s': %s",
			ProgramVersion,
			err.Error(),
		)
	}

	netmasterVer, err := semver.Make(netmasterVersion)
	if err != nil {
		return fmt.Errorf(
			"failed to create semver from netmaster version '%s': %s",
			netmasterVersion,
			err.Error(),
		)
	}

	compatible := netmasterVer.Major == proxyVer.Major && netmasterVer.Minor >= proxyVer.Minor

	if !compatible {
		return fmt.Errorf(
			"%s and netmaster versions are incompatible (%s: %q, netmaster: %q)",
			ProgramName,
			ProgramName,
			ProgramVersion,
			netmasterVersion,
		)
	}

	return nil
}

func main() {

	// prevent this process from being swapped out to disk
	syscall.Mlockall(syscall.MCL_CURRENT | syscall.MCL_FUTURE)

	log.Println(ProgramName, ProgramVersion, "starting up...")

	if DefaultVersion == ProgramVersion {
		log.Println("====================================================")
		log.Println("             DEV BUILD - DO NOT RELEASE             ")
		log.Println("====================================================")
	}

	processFlags()

	if debug {
		log.SetLevel(log.DebugLevel)
	}

	// Initialize data store
	if err := state.InitializeStateDriver(dataStoreAddress); err != nil {
		log.Fatalln(err)
		return
	}

	// Add built-in users
	log.Println("Adding default users with default passwords")
	if err := auth.AddDefaultUsers(); err != nil {
		log.Fatalln(err)
		return
	}

	if err := netmasterStartupCheck(); err != nil {
		log.Fatalln(err)
		return
	}

	if err := common.Global().Set("tls_key_file", tlsKeyFile); err != nil {
		log.Fatalln(err)
		return
	}

	p := proxy.NewServer(&proxy.Config{
		Name:                    ProgramName,
		Version:                 ProgramVersion,
		NetmasterAddress:        netmasterAddress,
		ListenAddress:           listenAddress,
		TLSCertificate:          tlsCertificate,
		TLSKeyFile:              tlsKeyFile,
		NetmasterRequestTimeout: netmasterRequestTimeout,
		ClientReadTimeout:       clientReadTimeout,
		ClientWriteTimeout:      clientWriteTimeout,
	})

	go p.Serve()

	runtime.Goexit()
}
