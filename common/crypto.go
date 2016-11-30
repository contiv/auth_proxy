package common

import (
	"bytes"
	"crypto/rand"
	"crypto/sha256"

	log "github.com/Sirupsen/logrus"

	"golang.org/x/crypto/pbkdf2"
)

const (
	// NumKdfIterations represents the number of iterations to perform for key derivation, larger number
	// implies bigger cost for dictionary attack, but also slower key derivation
	numKdfIterations int = 4096
	// KeyLength represents key size in bytes that is derived from the password
	keyLength int = 32
)

// GenPasswordHash generates a hash(password + random salt). Using salt protects against dictionary attacks.
// params:
//  password: clear text password string
// return values:
//  []byte: salt used to generate the hash
//  []byte: hash of password
//  error: nil if successful, else as returned from rand.Read()
func GenPasswordHash(password string) ([]byte, []byte, error) {
	// Generate a 32-byte salt
	salt := make([]byte, 32)
	_, err := rand.Read(salt)
	if err != nil {
		log.Error(err)
		return nil, nil, err
	}

	// generate a key of length 32 bytes using SHA-256 hash function. This
	// key is saved as the cryptographic hash of the password.
	hash := pbkdf2.Key([]byte(password), salt, numKdfIterations, keyLength, sha256.New)

	return salt, hash, nil
}

// ValidatePassword returns true if the supplied password's hash matches
// the correct password's hash, false otherwise.
// params:
//  salt: the salt string to use with password to generate hash
//  suppliedPassword: password string to be validated
//  correctPasswordHash: hash of password to compared against
// return values:
//  bool: if suppliedPassword matches correctPassword (or more precisely, if
//  the hash of suppliedPassword matches the hash of correctPassword), false
//  otherwise
func ValidatePassword(salt []byte, suppliedPassword string, correctPasswordHash []byte) bool {
	// generate a key of length 32 bytes using SHA-256 hash function. This
	// key serves as the cryptographic hash of the password.
	hash := pbkdf2.Key([]byte(suppliedPassword), salt, numKdfIterations, keyLength, sha256.New)

	if !bytes.Equal(hash, []byte(correctPasswordHash)) {
		return false
	}

	return true
}
