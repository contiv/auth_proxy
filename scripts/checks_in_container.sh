#!/bin/bash

set -e

export PATH="/go/bin:$PATH"

dirs=$(go list ./... | sed -e 's!github.com/contiv/auth_proxy!.!g' | grep -v ./vendor)
files=$(find . -type f -name '*.go' | grep -v ./vendor)

echo "Running gofmt..."
set +e
out=$(gofmt -s -l ${files})
set -e
# gofmt can include empty lines in its output
if [ "`echo \"${out}\" | sed '/^$/d' | wc -l`" -gt 0 ]
then
  echo 1>&2 "gofmt errors in:"
  echo 1>&2 "${out}"
  exit 1
fi

echo "Running ineffassign..."
for i in ${dirs}
do
  ineffassign $i
done

echo "Running golint..."
set +e
out=$(golint ./... | grep -vE '^vendor')
set -e
if [ "`echo \"${out}\" | sed '/^$/d' | wc -l`" -gt 0 ]
then
  echo 1>&2 "golint errors in:"
  echo 1>&2 "${out}"
  exit 1
fi

echo "Running govet..."
set +e
out=$(go tool vet -composites=false ${dirs} 2>&1 | grep -v vendor)
set -e

if [ "`echo \"${out}\" | sed '/^$/d' | wc -l`" -gt 0 ]
then
  echo 1>&2 "go vet errors in:"
  echo 1>&2 "${out}"
  exit 1
fi

echo "Running gocyclo..."
set +e
out=$(gocyclo -over 15 . | grep -v vendor)
set -e
if [ "`echo \"${out}\" | sed '/^$/d' | wc -l`" -gt 0 ]
then
  echo 1>&2 "gocyclo errors in:"
  echo 1>&2 "${out}"
  exit 1
fi

echo "Running misspell..."
set +e
out=$(misspell -locale US -error -i exportfs ${files})
set -e
if [ "`echo \"${out}\" | sed '/^$/d' | wc -l`" -gt 0 ]
then
  echo 1>&2 "misspell errors in:"
  echo 1>&2 "${out}"
  exit 1
fi

echo "Running deadcode..."
set +e
out=$(deadcode ${dirs} 2>&1)
set -e
if [ "`echo \"${out}\" | sed '/^$/d' | wc -l`" -gt 0 ]
then
  echo 1>&2 "deadcode errors in:"
  echo 1>&2 "${out}"
  exit 1
fi
