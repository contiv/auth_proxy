package main

import (
	"bufio"
	"flag"
	"fmt"
	"log"
	"os"
	"strings"
	"syscall"

	"golang.org/x/crypto/ssh/terminal"

	"github.com/contiv/auth_proxy/common"
	auth_errors "github.com/contiv/auth_proxy/common/errors"
	"github.com/contiv/auth_proxy/db"
	"github.com/contiv/auth_proxy/state"
)

var dataStoreAddress string // address of the data store

func main() {

	// prevent this process from being swapped out to disk
	syscall.Mlockall(syscall.MCL_CURRENT | syscall.MCL_FUTURE)

	// parse all flags
	flag.StringVar(
		&dataStoreAddress,
		"data-store-address",
		"",
		"address of the data-store: <host:port>\n"+
			"protocol must be etcd:// or consul://",
	)

	flag.Parse()

	// initialize data store
	if err := state.InitializeStateDriver(dataStoreAddress); err != nil {
		log.Fatalln(err)
		return
	}

	// read username, validate it, and fetch the user record
	username := readUsername()
	validateUsername(username)

	userRecord, err := db.GetLocalUser(username)
	if err != nil {
		if err == auth_errors.ErrKeyNotFound {
			log.Fatalln("could not find a local user named", username)
		} else {
			log.Fatalln("unexpected error when fetching user record:", err)
		}
	}

	// read + validate two passwords and confirm they are identical
	passwordOne := readPassword("Password: ")
	validatePassword(passwordOne)

	passwordTwo := readPassword("Confirm password: ")
	validatePassword(passwordTwo)

	if passwordOne != passwordTwo {
		log.Fatalln("passwords do not match!")
	}

	// update the user record
	userRecord.Password = passwordOne

	if err := db.UpdateLocalUser(username, userRecord); err != nil {
		if err == auth_errors.ErrKeyNotFound {
			log.Fatalln("key is missing for local user", username)
		} else {
			log.Fatalln("unexpected error when updating user record:", err)
		}
	}

	fmt.Printf("Password for the local user '%s' has been successfully changed.\n", username)
}

func readUsername() string {
	fmt.Print("Username: ")

	reader := bufio.NewReader(os.Stdin)

	username, err := reader.ReadString('\n')
	if err != nil {
		log.Fatalln("failed to read username:", err)
	}

	return strings.TrimSpace(username) // ReadString includes the newline
}

func readPassword(prompt string) string {
	fmt.Print(prompt)

	// use terminal.ReadPassword() so there's no echoing of what's typed
	bytePassword, err := terminal.ReadPassword(0) // fd 0 = stdin
	if err != nil {
		log.Fatalln("failed to read password:", err)
	}
	password := string(bytePassword)
	fmt.Println("")

	return password

}

func validateUsername(username string) {
	if common.IsEmpty(username) {
		log.Fatalln("username must not be blank")
	}
}

func validatePassword(password string) {
	if common.IsEmpty(password) {
		log.Fatalln("password must not be blank")
	}
}
