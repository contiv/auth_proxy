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

## Architecture Overview

Before anything else, a prospective user must authenticate and get a token.
Authentication requires passing a username and password to the
`/api/v1/ccn_proxy/login` endpoint:

```
login request ---> ccn_proxy ---> authentication
                                                \
                                                 local user *or* LDAP / Active Directory
                                                /
<---- token sent to client <---- ccn_proxy ----
```

Subsequent requests must pass this token along in a `X-Auth-Token` request
header.  All non-login requests are simply passed on to the `netmaster` if
authentication and authorization are both successful.

Example of a full request cycle:

1. A request for `/api/v1/networks` is sent in with a token in the `X-Auth-Token` header
1. The user represented by the token is authenticated against a local DB or LDAP / Active Directory
1. An authorization check is performed to see if the user is allowed to access the resource in question (networks)
1. If both authentication and authorization are successful, the request is proxied to `netmaster`
1. If the user is not an admin **and** the endpoint returns data for multiple tenants, the response from `netmaster` will be filtered to only return what the current user is allowed to see

```
request w. token ---> ccn_proxy ---> authorization ----> request forwarded to netmaster
                                                                                        \
                                                                                         netmaster
                                                                                        /
<------- results filtered based on token and returned to client <------- proxy --------
```
