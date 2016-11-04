# CCN Proxy

This proxy sits in front of `netmaster` and provides authentication via LDAP and authorization before forwarding requests.

## Building

Running `make` will generate a `ccn_proxy:devbuild` image.

You can also specify a version:

```sh
BUILD_VERSION=0.1 make
```

This will generate a `ccn_proxy:0.1` image.
