package common

import (
	"crypto/md5"
	"crypto/rand"
	"crypto/rsa"
	"crypto/x509"
	"encoding/base64"
	"encoding/pem"
	"fmt"
	"io/ioutil"

	"golang.org/x/crypto/bcrypt"

	log "github.com/Sirupsen/logrus"
	ccnerrors "github.com/contiv/ccn_proxy/common/errors"
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

// Encrypt encrypts the given string with the RSA public key.
// params:
//   data: String to be encrypted + encoded
// return values:
//  string: Encrypted with the public key and base64 encoded
//  error: nil if base64 encode and RSA encrypt succeeds, else the
//         appropriate encode/encrypt failure
func Encrypt(data string) (string, error) {
	if IsEmpty(data) {
		return data, nil
	}

	privateKey, err := getPrivateKey()
	if err != nil || privateKey == nil {
		log.Debugf("Error retrieving RSA Private key: %#v", err)
		return data, err
	}

	md5Hash := md5.New()

	encrypted, err := rsa.EncryptOAEP(md5Hash, rand.Reader, &privateKey.PublicKey, []byte(data), nil)
	if err != nil {
		log.Debugf("RSA encryption failed: %#v", err)
		return data, err
	}

	return base64.StdEncoding.EncodeToString(encrypted), nil
}

// Decrypt decrypts the given string with the RSA private key.
// params:
//   data: String to decode + decrypt, which is in a base64 encoded format
// return values:
//  string: Decrypted text
//  error: nil if base64 decode and RSA decrypt succeeds, else the
//         appropriate decode/decrypt failure
func Decrypt(data string) (string, error) {
	if IsEmpty(data) {
		return data, nil
	}
	privateKey, err := getPrivateKey()

	if err != nil || privateKey == nil {
		log.Debugf("Error retrieving RSA Private key: %#v", err)
		return data, err
	}

	md5Hash := md5.New()

	encryptedBytes, err := base64.StdEncoding.DecodeString(data)
	if err != nil {
		log.Debugf("Base64 decode failed: %#v", err)
		return data, err
	}

	decrypted, err := rsa.DecryptOAEP(md5Hash, rand.Reader, privateKey, encryptedBytes, nil)
	if err != nil {
		log.Debugf("RSA decryption failed: %#v", err)
		return data, err
	}

	return string(decrypted), nil

}

// getPrivateKey gets the private key from the .key file
// return values:
//  *rsa.PrivateKey: RSA private key, which also contains the public key for encryption
//  error: nil if it reads a valid RSA private key,
//         else appropriate parse/decoding error.
func getPrivateKey() (*rsa.PrivateKey, error) {
	keyFile, err := Global().Get("tls_key_file")
	if err != nil {
		if err == ccnerrors.ErrKeyNotFound {
			return nil, fmt.Errorf("No TLS key file found")
		}

		return nil, err
	}

	pemData, err := ioutil.ReadFile(keyFile)
	if err != nil {
		log.Debugf("Error reading pem file: ", err)
		return nil, err
	}

	block, _ := pem.Decode(pemData)

	if block == nil {
		log.Debug("No valid PEM data found")
		return nil, err
	}

	privateKey, err := x509.ParsePKCS8PrivateKey(block.Bytes)
	if err != nil {
		privateKey, err := x509.ParsePKCS1PrivateKey(block.Bytes)

		if err != nil {
			log.Debug("Failed to decode private key: ", err)
		}

		return privateKey, err
	}

	return privateKey.(*rsa.PrivateKey), nil
}
