# CCN Proxy

This proxy provides authentication via Active Directory and authorization via
RBAC before forwarding requests to an upstream `netmaster`. It is TLS-only,
and it will only talk to a non-TLS `netmaster`.  Future versions will allow
or potentially require TLS-only communication with `netmaster`.

## Building

Running `make` will generate a `ccn_proxy:devbuild` image.

You can also specify a version, e.g., `BUILD_VERSION=0.1 make`.  This will
generate a `ccn_proxy:0.1` image.

## Testing locally

You will need a local cert and key to start `ccn_proxy`.  You can run
`make generate-certificate` to generate them if you don't already have them.

You can also just run `make run` which will build a build image, use
the build image to build the minimalist `ccn_proxy` image, generate a self-signed
certificate + key if you don't already have them, and start the `ccn_proxy` with
the self-signed certificate and key bind-mounted into the correct location
automatically.  This works with local Docker installations and Docker Machine
installations.
