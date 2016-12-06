package common

import (
	"golang.org/x/crypto/bcrypt"

	log "github.com/Sirupsen/logrus"
)

const (
	// bcrypt.DefaultCost is 10, but this is too weak for modern hardware.
	// 13 is a good choice for 2017:
	//   - strong enough that it won't be considered weak any time soon
	//   - doesn't take an egregious amount of time to generate hashes
	cost = 13
)

// GenPasswordHash generates a hash from the provided password.
// params:
//  password: plaintext password string
// return values:
//  []byte: hash of password
//  error: nil if successful, otherwise the error from bcrypt.GenerateFromPassword()
func GenPasswordHash(password string) ([]byte, error) {
	hash, err := bcrypt.GenerateFromPassword([]byte(password), cost)
	if err != nil {
		log.Error(err)
		return nil, err
	}

	return hash, nil
}

// ValidatePassword returns true if the supplied password's hash matches
// the correct password's hash, false otherwise.
// params:
//  password: plaintext password from the user
//  passwordHash: hash to compare the password against
// return values:
//  bool: true if the password matches the hash, otherwise false
func ValidatePassword(password string, passwordHash []byte) bool {
	// nil result means the password matched the hash
	return nil == bcrypt.CompareHashAndPassword(passwordHash, []byte(password))
}
