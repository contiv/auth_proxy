package systemtests

import . "gopkg.in/check.v1"

// TestResetLocalUserPassword tests that the 'reset_local_user_password' binary
// actually does what its name implies it does. :)
func (s *systemtestSuite) TestResetLocalUserPassword(c *C) {
	runTest(func(ms *MockServer) {
		//
		// ensure the original credentials work
		//
		token, resp, err := login(adminUsername, adminPassword)
		c.Assert(err, IsNil)
		c.Assert(resp.StatusCode, Equals, 200)
		c.Assert(len(token), Not(Equals), 0)

		//
		// update the user's password
		//
		newPassword := "123456"

		stdin := "admin\n" + newPassword + "\n" + newPassword + "\n"

		//
		// TODO: launch "reset_local_user_password" binary here and feed
		//       newPassword to it as stdin
		//
		_ = stdin

		//
		// ensure the original password no longer works
		//
		token, resp, err = login(adminUsername, adminPassword)
		c.Assert(err, IsNil)
		c.Assert(resp.StatusCode, Equals, 401)
		c.Assert(len(token), Equals, 0)

		//
		// ensure the new password works
		//
		token, resp, err = login(adminUsername, newPassword)
		c.Assert(err, IsNil)
		c.Assert(resp.StatusCode, Equals, 200)
		c.Assert(len(token), Not(Equals), 0)
	})
}
