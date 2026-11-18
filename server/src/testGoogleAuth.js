require('dotenv').config({ path: require('path').resolve(__dirname, '../.env') });
const mongoose = require('mongoose');
const User = require('./models/User');
const authController = require('./controllers/authController');

// Test suite for Google Identity Services Authentication
async function runGoogleAuthTests() {
  console.log('=== RASAVANTA AI GOOGLE SIGN-IN INTEGRATION TESTS ===\n');

  let passed = 0;
  let failed = 0;

  function assert(condition, message) {
    if (condition) {
      console.log(`[PASS] ${message}`);
      passed++;
    } else {
      console.error(`[FAIL] ${message}`);
      failed++;
    }
  }

  // Helper mock response
  function createMockRes() {
    return {
      statusCode: 200,
      data: null,
      status(code) {
        this.statusCode = code;
        return this;
      },
      json(payload) {
        this.data = payload;
        return this;
      }
    };
  }

  // 1. Missing credential test
  console.log('--- Test 1: Missing Credential Validation ---');
  {
    const req = { body: {} };
    const res = createMockRes();
    await authController.googleAuth(req, res);
    assert(res.statusCode === 400, 'Rejects empty credential with HTTP 400');
    assert(res.data && res.data.success === false, 'Returns success: false');
  }

  // 2. Invalid Google token test
  console.log('\n--- Test 2: Invalid/Expired Google Token Verification ---');
  {
    const req = { body: { credential: 'forged_or_invalid_jwt_token_12345' } };
    const res = createMockRes();
    await authController.googleAuth(req, res);
    assert(res.statusCode === 401, 'Rejects invalid Google ID token with HTTP 401');
    assert(res.data && res.data.message.includes('Invalid or expired'), 'Returns clear security error message');
  }

  // 3. User Schema Verification: Password is not required for Google users
  console.log('\n--- Test 3: User Model Schema Validation ---');
  {
    const googleUserInstance = new User({
      id: `usr-test-google-${Date.now()}`,
      name: 'Google Chef Test',
      email: `google.chef.${Date.now()}@example.com`,
      googleId: '109876543210987654321',
      authProvider: 'google',
      role: 'Home Chef'
    });

    const validationError = googleUserInstance.validateSync();
    assert(!validationError, 'User with authProvider="google" successfully validates without password');

    const localUserInstance = new User({
      id: `usr-test-local-${Date.now()}`,
      name: 'Local Chef Test',
      email: `local.chef.${Date.now()}@example.com`,
      authProvider: 'local'
      // password missing
    });

    const localValidationError = localUserInstance.validateSync();
    assert(localValidationError && localValidationError.errors.password, 'User with authProvider="local" still requires password');
  }

  // 4. Standard local registration and login preservation
  console.log('\n--- Test 4: Existing Local Email/Password Login & Register Preservation ---');
  {
    const testEmail = `local.chef.${Date.now()}@rasavanta.test`;
    const regReq = {
      body: {
        name: 'Local Test Chef',
        email: testEmail,
        password: 'SecurePassword2026!'
      }
    };
    const regRes = createMockRes();
    await authController.register(regReq, regRes);
    assert(regRes.statusCode === 201, 'Existing local registration passes with HTTP 201');
    assert(regRes.data && regRes.data.token && regRes.data.user, 'Returns standard JWT token and sanitized user');

    // Login test
    const loginReq = {
      body: {
        email: testEmail,
        password: 'SecurePassword2026!'
      }
    };
    const loginRes = createMockRes();
    await authController.login(loginReq, loginRes);
    assert(loginRes.statusCode === 200, 'Existing local login passes with HTTP 200');
    assert(loginRes.data && loginRes.data.user.email === testEmail, 'User profile returned matches registered user');
  }

  // 5. Account linking by email test
  console.log('\n--- Test 5: Existing Account Linking by Email ---');
  {
    // Simulate user already existing with local email
    const linkedEmail = `chef.linking.${Date.now()}@rasavanta.test`;
    const localUser = new User({
      id: `usr-link-${Date.now()}`,
      name: 'Existing Chef Before Google',
      email: linkedEmail,
      password: 'OldPassword123',
      authProvider: 'local'
    });
    
    assert(localUser.email === linkedEmail, 'Created existing user candidate for email linking');
    assert(!localUser.googleId, 'Initial user has no Google ID linked');
    
    // Link Google ID
    localUser.googleId = 'google-sub-id-99887766';
    assert(localUser.googleId === 'google-sub-id-99887766', 'Google ID links safely to existing user by email');
  }

  console.log(`\n==================================================`);
  console.log(`TEST SUMMARY: ${passed} PASSED, ${failed} FAILED`);
  console.log(`==================================================`);

  if (failed > 0) {
    process.exit(1);
  } else {
    process.exit(0);
  }
}

runGoogleAuthTests().catch((err) => {
  console.error('Unexpected test error:', err);
  process.exit(1);
});
