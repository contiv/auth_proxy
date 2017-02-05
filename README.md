# Auth Proxy

`auth_proxy`  provides authentication and authorization via
RBAC before forwarding requests to an upstream `netmaster`. It is TLS-only,
and it will only talk to a non-TLS `netmaster`.  Future versions will allow
or potentially require TLS-only communication with `netmaster`.

`auth_proxy` also hosts the UI (see the [contiv-ui repo](https://github.com/contiv/contiv-ui)).
The UI is baked into the container and lives at the `/ui` directory. It is served
from the root of the proxy, e.g., if you run with `--listen-address=localhost:10000`,
you can see the UI at https://localhost:10000

A custom version of the UI can be bindmounted over the baked-in version. Note that
you need to bind in the `/app` directory under the `contiv-ui` repo, not the base
directory: `-v /your/contiv-ui/repo/app:/ui:ro`

## Building

Running `make` will generate a `auth_proxy:devbuild` image using the current code
you have checked out and `HEAD` from the `master` branch in the `contiv-ui` repo.

You can also specify a version, e.g., `BUILD_VERSION=0.1 make`.  This will
generate a `auth_proxy:0.1` image using current code you have checked out and
whatever commit is tagged as `0.1` in the `contiv-ui` repo.

`auth_proxy` will check the version of the `netmaster` it's pointed to at startup.
We require that the major versions are the same and that the minor version of
`netmaster` is >= the minor version of `auth_proxy`.

For example, version `1.2.3` of `auth_proxy`  will only talk to a `netmaster` build
version of `1.x.y` where `x` is >= 2 and `y` can be anything.

## Running Tests

Just run `make test` to run the systemtests and unit tests.  The tests are fully
containerized and will spawn anything they require as part of the test run
(note that this does NOT currently include an AD server and we are still using a
hardcoded one).  There is also a `MockServer` available in the `systemtests`
directory which can pretend to be `netmaster` for the purposes of testing.  This
allows us to mock the parts of `netmaster` we need (mainly that a given endpoint
returns some expected JSON response) without the burden of actually compiling
and running a full `netmaster` binary and all of its dependencies plus creating
the necessary networks, tenants, etc. to get realistic responses from it.

For a complete e2e setup involving proxy+UI+netmaster, see contiv/install.

## Local Development

You will need a local cert and key to start `auth_proxy`.  You can run
`make generate-certificate` to generate them if you don't already have them. To test proxy
only functionality, try `make run`.

## Architecture Overview

Before anything else, a prospective user must authenticate and get a token.
Authentication requires passing a username and password to the
`/api/v1/auth_proxy/login` endpoint:

```
login request ---> auth_proxy ---> authentication
                                                \
                                                 local user *or* LDAP / Active Directory
                                                /
<---- token sent to client <---- auth_proxy ----
```

Subsequent requests must pass this token along in a `X-Auth-Token` request
header.  All non-login requests are simply passed on to the `netmaster` if
authentication and authorization are both successful.

### Example of a full request cycle:

1. A request for `/api/v1/networks/` is sent in with a token in the `X-Auth-Token` header
1. The user represented by the token is authenticated against a local DB or LDAP / Active Directory
1. An authorization check is performed to see if the user is allowed to access the resource in question (networks)
1. If both authentication and authorization are successful, the request is proxied to `netmaster`
1. If the user is not an admin **and** the endpoint returns data for multiple tenants, the response from `netmaster` will be filtered to only return what the current user is allowed to see

```
request w. token ---> auth_proxy ---> authorization ----> request forwarded to netmaster
                                                                                        \
                                                                                         netmaster
                                                                                        /
<----- results filtered based on token and returned to client <----- auth_proxy --------
```

### Tips

To start an etcd v2 datastore (highest version supported by `netmaster` and `netplugin`):

```sh
docker run -d --name etcd -p 2379:2379 quay.io/coreos/etcd:v2.3.7 --listen-client-urls http://0.0.0.0:2379 --advertise-client-urls http://0.0.0.0:2379
```

To start a Consul datastore:

```sh
docker run -d --name consul -p 8500:8500  consul
```

The Consul UI also runs on port 8500.
