package state

import (
	"bytes"
	"encoding/json"
	"testing"
	"time"

	"github.com/contiv/ccn_proxy/common/types"
)

const (
	waitTimeout = 5 * time.Second
)

// Test helper function to check if KV store initialization fails as expected
// for incorrect configurations
func commonTestStateDriverInitInvalidConfig(t *testing.T, d types.StateDriver) {

	// try to configure with incorrect URL
	config := types.KVStoreConfig{StoreURL: "xyz://127.0.0.1:2379"}
	err := d.Init(&config)
	if err == nil {
		t.Fatalf("driver init succeeded, should have failed.")
	}

	// try to configure with nil URL
	err = d.Init(nil)
	if err == nil {
		t.Fatalf("driver init succeeded, should have failed.")
	}
}

// Test helper function to check writes to KV store
func commonTestStateDriverWrite(t *testing.T, d types.StateDriver) {
	testBytes := []byte{0xb, 0xa, 0xd, 0xb, 0xa, 0xb, 0xe}
	key := "TestKeyRawWrite"

	err := d.Write(key, testBytes)
	if err != nil {
		t.Fatalf("failed to write to etcd, err: %s", err)
	}
}

// Test helper function to check reads from KV store
func commonTestStateDriverRead(t *testing.T, d types.StateDriver) {
	testBytes := []byte{0xb, 0xa, 0xd, 0xb, 0xa, 0xb, 0xe}
	key := "TestKeyRawRead"

	err := d.Write(key, testBytes)
	if err != nil {
		t.Fatalf("failed to write to etcd, err: %s", err)
	}

	readBytes, err := d.Read(key)
	if err != nil {
		t.Fatalf("failed to read from etcd, err: %s", err)
	}

	if !bytes.Equal(testBytes, readBytes) {
		t.Fatalf("read bytes don't match written bytes. Wrote: %v Read: %v",
			testBytes, readBytes)
	}
}

// Test helper function to check writes to KV store
func commonTestStateDriverWriteState(t *testing.T, d types.StateDriver) {
	state := &testState{
		IgnoredField: d,
		IntField:     1234,
		StrField:     "testString",
	}
	key := "testKey"

	err := d.WriteState(key, state, json.Marshal)
	if err != nil {
		t.Fatalf("failed to write state to etcd, err: %s", err)
	}
}

// Test helper function to check writing updated state to KV store
func commonTestStateDriverWriteStateForUpdate(t *testing.T, d types.StateDriver) {
	state := &testState{IgnoredField: d, IntField: 1234,
		StrField: "testString"}
	key := "testKeyForUpdate"

	err := d.WriteState(key, state, json.Marshal)
	if err != nil {
		t.Fatalf("failed to write state to etcd, err: %s", err)
	}

	state.StrField = "testString-update"
	err = d.WriteState(key, state, json.Marshal)
	if err != nil {
		t.Fatalf("failed to update state to etcd, err: %s", err)
	}
}

// Test helper function to check clearing state in KV store
func commonTestStateDriverClearState(t *testing.T, d types.StateDriver) {
	state := &testState{IntField: 1234, StrField: "testString"}
	key := "testKeyClear"

	err := d.WriteState(key, state, json.Marshal)
	if err != nil {
		t.Fatalf("failed to write state to etcd, err: %s", err)
	}

	err = d.ClearState(key)
	if err != nil {
		t.Fatalf("failed to clear state in etcd, err: %s", err)
	}

	readState := &testState{}
	err = d.ReadState(key, readState, json.Unmarshal)
	if err == nil {
		t.Fatalf("cleared state should not be available in etcd for read")
	}
}

// Test helper function to check reading state from KV store
func commonTestStateDriverReadState(t *testing.T, d types.StateDriver) {
	state := &testState{IgnoredField: d, IntField: 1234,
		StrField: "testString"}
	key := "ccnproxy/dir1/testKeyRead"

	err := d.WriteState(key, state, json.Marshal)
	if err != nil {
		t.Fatalf("failed to write state to etcd, err: %s", err)
	}

	readState := &testState{}
	err = d.ReadState(key, readState, json.Unmarshal)
	if err != nil {
		t.Fatalf("failed to read state from etcd, err: %s", err)
	}

	if readState.IntField != state.IntField || readState.StrField != state.StrField {
		t.Fatalf("Read state didn't match state written. Wrote: %v Read: %v",
			state, readState)
	}
}

// Test helper function to check reading of state from KV store
// after an update
func commonTestStateDriverReadStateAfterUpdate(t *testing.T, d types.StateDriver) {
	state := &testState{IntField: 1234, StrField: "testString"}
	key := "testKeyReadUpdate"

	err := d.WriteState(key, state, json.Marshal)
	if err != nil {
		t.Fatalf("failed to write state to etcd, err: %s", err)
	}

	state.StrField = "testStringUpdated"
	err = d.WriteState(key, state, json.Marshal)
	if err != nil {
		t.Fatalf("failed to update state, err: %s", err)
	}

	readState := &testState{}
	err = d.ReadState(key, readState, json.Unmarshal)
	if err != nil {
		t.Fatalf("failed to read state, err: %s", err)
	}

	if readState.IntField != state.IntField || readState.StrField != state.StrField {
		t.Fatalf("Read state didn't match state written. Wrote: %v Read: %v",
			state, readState)
	}
}

// Test helper function to check reading of state from KV store
// after it had been cleared
func commonTestStateDriverReadStateAfterClear(t *testing.T, d types.StateDriver) {
	state := &testState{IntField: 1234, StrField: "testString"}
	key := "testKeyReadClear"

	err := d.WriteState(key, state, json.Marshal)
	if err != nil {
		t.Fatalf("failed to write state to etcd, err: %s", err)
	}

	err = d.ClearState(key)
	if err != nil {
		t.Fatalf("failed to clear state to etcd, err: %s", err)
	}

	readState := &testState{}
	err = d.ReadState(key, readState, json.Unmarshal)
	if err == nil {
		t.Fatalf("Able to read cleared state! Key: %s, Value: %v",
			key, readState)
	}
}

// Test helper function to check watching all 'created' state
// in KV store
func commonTestStateDriverWatchAllStateCreate(t *testing.T, d types.StateDriver) {
	state := &testState{IntField: 1234, StrField: "testString"}
	baseKey := "create"
	key := baseKey + "/testKeyWatchAll"

	recvErr := make(chan error, 1)
	stateCh := make(chan types.WatchState, 1)
	timer := time.After(waitTimeout)

	go func(rsps chan types.WatchState, retErr chan error) {
		err := d.WatchAllState(baseKey, state, json.Unmarshal, stateCh)
		if err != nil {
			retErr <- err
			return
		}
	}(stateCh, recvErr)

	// trigger create after a slight pause to ensure that events are not missed
	time.Sleep(time.Second)
	err := d.WriteState(key, state, json.Marshal)
	if err != nil {
		t.Fatalf("failed to write state, err: %s", err)
	}
	defer func() {
		d.ClearState(key)
	}()

for_label:
	for {
		select {
		case watchState := <-stateCh:
			s := watchState.Curr.(*testState)
			if s.IntField != state.IntField || s.StrField != state.StrField {
				t.Fatalf("Watch state mismatch. Expctd: %+v, Rcvd: %+v", state, s)
			}
			if watchState.Prev != nil {
				t.Fatalf("Watch state as prev state set %+v, expected to be nil", watchState.Prev)
			}
			break for_label
		case err := <-recvErr:
			t.Fatalf("watch failed, err: %s", err)
			break for_label
		case <-timer:
			t.Fatalf("timed out waiting for events")
			break for_label
		}
	}
}

// Test helper function to watch all 'modified' state in KV store
func commonTestStateDriverWatchAllStateModify(t *testing.T, d types.StateDriver) {
	state := &testState{IntField: 1234, StrField: "testString"}
	modState := &testState{IntField: 5678, StrField: "modString"}
	baseKey := "modify"
	key := baseKey + "/testKeyWatchAll"

	err := d.WriteState(key, state, json.Marshal)
	if err != nil {
		t.Fatalf("failed to write state, err: %s", err)
	}
	defer func() {
		d.ClearState(key)
	}()

	recvErr := make(chan error, 1)
	stateCh := make(chan types.WatchState, 1)
	timer := time.After(waitTimeout)

	go func(rsps chan types.WatchState, retErr chan error) {
		err := d.WatchAllState(baseKey, state, json.Unmarshal, stateCh)
		if err != nil {
			retErr <- err
			return
		}
	}(stateCh, recvErr)

	// trigger modify after a slight pause to ensure that events are not missed
	time.Sleep(time.Second)
	err = d.WriteState(key, modState, json.Marshal)
	if err != nil {
		t.Fatalf("failed to write state, err: %s", err)
	}

for_label:
	for {
		select {
		case watchState := <-stateCh:
			s := watchState.Curr.(*testState)
			if s.IntField != modState.IntField || s.StrField != modState.StrField {
				t.Fatalf("Watch state mismatch. Expctd: %+v, Rcvd: %+v", modState, s)
			}
			if watchState.Prev == nil {
				t.Fatalf("Received a modify event without previous state value set.")
			}
			s = watchState.Prev.(*testState)
			if s.IntField != state.IntField || s.StrField != state.StrField {
				t.Fatalf("Watch state mismatch. Expctd: %+v, Rcvd: %+v", state, s)
			}
			break for_label
		case err := <-recvErr:
			t.Fatalf("Watch failed, err: %s", err)
			break for_label
		case <-timer:
			t.Fatalf("timed out waiting for events")
			break for_label
		}
	}
}

// Test helper function to watch all 'deleted' state in KV store
func commonTestStateDriverWatchAllStateDelete(t *testing.T, d types.StateDriver) {
	state := &testState{IntField: 1234, StrField: "testString"}
	baseKey := "delete"
	key := baseKey + "/testKeyWatchAll"

	err := d.WriteState(key, state, json.Marshal)
	if err != nil {
		t.Fatalf("failed to write state, err: %s", err)
	}
	defer func() {
		d.ClearState(key)
	}()

	// error from watch goroutine
	recvErr := make(chan error, 1)
	stateCh := make(chan types.WatchState, 1)
	timer := time.After(waitTimeout)

	go func(rsps chan types.WatchState, retErr chan error) {
		err := d.WatchAllState(baseKey, state, json.Unmarshal, stateCh)
		if err != nil {
			retErr <- err
			return
		}
	}(stateCh, recvErr)

	// trigger delete after a slight pause to ensure that events are not missed
	time.Sleep(time.Second)
	err = d.ClearState(key)
	if err != nil {
		t.Fatalf("failed to clear state, err: %s", err)
	}

for_label:
	for {
		select {
		case watchState := <-stateCh:
			if watchState.Curr != nil {
				t.Fatalf("Watch state has current state set %+v, expected to be nil", watchState.Curr)
			}
			if watchState.Prev == nil {
				t.Fatalf("Received a delete event without previous state value set.")
			}
			s := watchState.Prev.(*testState)
			if s.IntField != state.IntField || s.StrField != state.StrField {
				t.Fatalf("Watch state mismatch. Expctd: %+v, Rcvd: %+v", state, s)
			}
			break for_label
		case err := <-recvErr:
			t.Fatalf("Watch failed, err: %s", err)
			break for_label
		case <-timer:
			t.Fatalf("timed out waiting for events")
			break for_label
		}
	}
}
