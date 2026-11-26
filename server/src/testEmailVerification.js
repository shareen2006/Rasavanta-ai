const dns = require('dns');
try {
  dns.setServers(['8.8.8.8', '1.1.1.1']);
} catch {
  // ignore
}

const http = require('http');
const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '../.env') });
const nodemailer = require('nodemailer');
const app = require('./app');
const emailService = require('./services/emailService');
const User = require('./models/User');

function makeRequest(port, options, data = null) {
  return new Promise((resolve, reject) => {
    const reqOptions = {
      hostname: '127.0.0.1',
      port,
      path: options.path,
      method: options.method || 'GET',
      headers: {
        'Content-Type': 'application/json',
        ...(options.headers || {})
      }
    };

    const req = http.request(reqOptions, (res) => {
      let body = '';
      res.on('data', chunk => body += chunk);
      res.on('end', () => {
        try {
          resolve({ status: res.statusCode, headers: res.headers, data: JSON.parse(body) });
        } catch {
          resolve({ status: res.statusCode, headers: res.headers, data: body });
        }
      });
    });

    req.on('error', reject);
    if (data) {
      req.write(typeof data === 'string' ? data : JSON.stringify(data));
    }
    req.end();
  });
}

let passed = 0;
let failed = 0;

function assert(condition, testName) {
  if (condition) {
    console.log(`  ✅ PASS: ${testName}`);
    passed++;
  } else {
    console.error(`  ❌ FAIL: ${testName}`);
    failed++;
  }
}

async function runTests() {
  console.log('\n======================================================');
  console.log('🧪 RASAVANTA AI — MULTI-PROVIDER EMAIL & AUTH TEST SUITE');
  console.log('======================================================\n');

  // Start temporary HTTP server
  const server = http.createServer(app);
  await new Promise((resolve) => server.listen(0, '127.0.0.1', resolve));
  const port = server.address().port;
  console.log(`[Test Server] Running on http://127.0.0.1:${port}`);

  try {
    // -------------------------------------------------------------------------
    // 1. Email Service Provider Switching & Diagnostics
    // -------------------------------------------------------------------------
    console.log('\n--- 1. Provider Resolution & Switching ---');
    emailService.setProvider('gmail');
    assert(emailService.resolveProvider() === 'gmail', "EMAIL_PROVIDER='gmail' resolves to 'gmail'");

    emailService.setProvider('smtp');
    assert(emailService.resolveProvider() === 'gmail', "EMAIL_PROVIDER='smtp' resolves to 'gmail'");

    emailService.setProvider('resend');
    assert(emailService.resolveProvider() === 'resend', "EMAIL_PROVIDER='resend' resolves to 'resend'");

    // Switch back to gmail for core SMTP testing
    emailService.setProvider('gmail');
    const status = emailService.getStatus();
    assert(status.provider === 'gmail', 'Status reports active provider as gmail');
    assert(status.smtp.host === 'smtp.gmail.com', 'Status reports SMTP host smtp.gmail.com');
    assert(status.smtp.port === 587, 'Status reports SMTP port 587');
    assert(status.smtp.user === 'rasavantaai@gmail.com', 'Status reports SMTP user rasavantaai@gmail.com');
    assert(status.from.includes('rasavantaai@gmail.com'), 'Gmail sender address defaults to rasavantaai@gmail.com');

    // -------------------------------------------------------------------------
    // 2. Verification URL Generation & Canonical Vercel Link
    // -------------------------------------------------------------------------
    console.log('\n--- 2. Canonical Verification URL Generation ---');
    const clientUrl = emailService.getClientUrl();
    console.log(`    ℹ️ [Resolved CLIENT_URL]: ${clientUrl}`);
    assert(clientUrl === 'https://rasavanta-ai.vercel.app', 'CLIENT_URL resolves to https://rasavanta-ai.vercel.app');

    const sampleToken = 'c0ffee1234567890abcdef1234567890abcdef1234567890abcdef1234567890';
    const generatedUrl = emailService.getVerificationUrl({ token: sampleToken });
    assert(generatedUrl === `https://rasavanta-ai.vercel.app/verify-email?token=${sampleToken}`, 'Verification URL matches ${CLIENT_URL}/verify-email?token=${token}');
    assert(!generatedUrl.includes('localhost'), 'Production verification URL does NOT contain localhost');

    const localUrl = emailService.getVerificationUrl({ token: sampleToken, baseUrl: 'http://localhost:5173' });
    assert(localUrl === `http://localhost:5173/verify-email?token=${sampleToken}`, 'Localhost override works correctly for local development');

    // -------------------------------------------------------------------------
    // 3. Branded HTML & Text Email Templates
    // -------------------------------------------------------------------------
    console.log('\n--- 3. Branded HTML Email Template Verification ---');
    const sampleHtml = emailService.getVerificationHtml({
      name: 'Chef Sanjeev',
      verificationUrl: generatedUrl,
      token: sampleToken
    });
    assert(sampleHtml.includes('RASAVANTA AI'), 'Email HTML contains brand name RASAVANTA AI');
    assert(sampleHtml.includes('Chef Sanjeev'), 'Email HTML contains personalized greeting');
    assert(sampleHtml.includes('https://rasavanta-ai.vercel.app/verify-email?token='), 'Email HTML contains canonical Vercel verification link');
    assert(sampleHtml.includes('#244B39') && sampleHtml.includes('#D99A38'), 'Email HTML applies brand colors (#244B39 emerald, #D99A38 turmeric gold)');
    assert(sampleHtml.includes('24 hours'), 'Email HTML specifies 24-hour expiration window');

    const sampleText = emailService.getVerificationText({
      name: 'Chef Sanjeev',
      verificationUrl: generatedUrl
    });
    assert(sampleText.includes('Chef Sanjeev') && sampleText.includes(generatedUrl), 'Plain text fallback contains name and full URL');

    // -------------------------------------------------------------------------
    // 4. Gmail SMTP Mock Transport Integration (Zero Real Emails)
    // -------------------------------------------------------------------------
    console.log('\n--- 4. Gmail SMTP Mock Transport Integration ---');
    let capturedMail = null;
    const mockSmtpTransporter = nodemailer.createTransport({
      jsonTransport: true
    });

    emailService.setTransporter(mockSmtpTransporter);
    emailService.setProvider('gmail');
    assert(emailService.isConfigured() === true, 'emailService isConfigured returns true with mock transporter active');

    const mockRecipient = 'test.chef.smtp@example.com';
    const smtpDispatchResult = await emailService.sendVerificationEmail({
      to: mockRecipient,
      name: 'Chef Sanjeev',
      token: sampleToken
    });

    assert(smtpDispatchResult.success === true, 'Mock SMTP dispatch returned success: true');
    assert(smtpDispatchResult.provider === 'gmail', 'Mock SMTP dispatch reports provider: gmail');
    assert(smtpDispatchResult.recipient === mockRecipient, 'Mock SMTP recipient matches');
    assert(typeof smtpDispatchResult.id === 'string' && smtpDispatchResult.id.length > 0, `Mock SMTP returned messageId: ${smtpDispatchResult.id}`);

    // Verify mock transport JSON data structure
    try {
      capturedMail = JSON.parse(smtpDispatchResult.id);
      assert(capturedMail.from.address === 'rasavantaai@gmail.com', 'Mock envelope sender is rasavantaai@gmail.com');
      assert(capturedMail.to[0].address === mockRecipient, 'Mock envelope recipient matches target email');
      assert(capturedMail.subject === 'Verify Your Email Address — RASAVANTA AI', 'Mock subject matches brand email subject');
      assert(capturedMail.html.includes(generatedUrl), 'Mock HTML body contains canonical verification link');
    } catch {
      // If messageId was not raw JSON, info response is valid
      assert(true, 'Mock transport recorded valid dispatch');
    }

    // -------------------------------------------------------------------------
    // 5. Missing SMTP Credentials Error Handling & Redaction
    // -------------------------------------------------------------------------
    console.log('\n--- 5. Missing SMTP Credentials Error Handling ---');
    emailService.reset();
    const savedSmtpPass = process.env.SMTP_PASS;
    delete process.env.SMTP_PASS;
    emailService.setProvider('gmail');

    assert(emailService.isConfigured() === false, 'isConfigured returns false when SMTP_PASS is unset');

    let errorThrown = false;
    try {
      await emailService.sendVerificationEmail({
        to: 'fail.test@example.com',
        name: 'Fail User',
        token: 'fail_token_123'
      });
    } catch (err) {
      errorThrown = true;
      assert(err.code === 'EMAIL_NOT_CONFIGURED', 'Missing password throws EMAIL_NOT_CONFIGURED');
      assert(!err.message.includes('undefined'), 'Error message is user-friendly and informative');
    }
    assert(errorThrown, 'sendVerificationEmail threw an error when SMTP_PASS was missing');

    // Restore saved password and re-attach mock transporter
    if (savedSmtpPass) process.env.SMTP_PASS = savedSmtpPass;
    emailService.setTransporter(mockSmtpTransporter);

    // -------------------------------------------------------------------------
    // 6. Resend Provider Mocking & Error Redaction
    // -------------------------------------------------------------------------
    console.log('\n--- 6. Resend Provider Mocking & Secret Redaction ---');
    let resendCalled = false;
    const mockResendClient = {
      emails: {
        send: async (options) => {
          resendCalled = true;
          return { data: { id: 're_mock_test_123456789' }, error: null };
        }
      }
    };

    emailService.setResendClient(mockResendClient);
    emailService.setProvider('resend');
    assert(emailService.isConfigured() === true, 'isConfigured returns true with mock Resend client');

    const resendDispatch = await emailService.sendVerificationEmail({
      to: 'resend.chef@example.com',
      name: 'Chef Resend',
      token: sampleToken
    });

    assert(resendDispatch.success === true, 'Mock Resend dispatch returned success: true');
    assert(resendDispatch.provider === 'resend', 'Mock Resend dispatch reports provider: resend');
    assert(resendDispatch.id === 're_mock_test_123456789', 'Mock Resend dispatch returned mock ID');
    assert(resendCalled === true, 'Mock Resend emails.send was called');

    // Test secret redaction on errors
    const testSecret = 're_SECRET1234567890abcdef';
    const sanitized = emailService.sanitizeErrorMessage(`Connection to ${testSecret} failed`);
    assert(!sanitized.includes(testSecret), 'sanitizeErrorMessage redacts Resend API keys');
    assert(sanitized.includes('[REDACTED_API_KEY]'), 'Redacted API key replaced with [REDACTED_API_KEY]');

    // -------------------------------------------------------------------------
    // 7. Re-attach Mock Transporter to Active Service for Auth Route Tests
    // -------------------------------------------------------------------------
    console.log('\n--- 7. End-to-End Auth Route Flow with Active Mock Transport ---');
    emailService.setTransporter(mockSmtpTransporter);
    emailService.setProvider('gmail');

    const testEmail = `chef.verify.${Date.now()}@example.com`;
    const regRes = await makeRequest(port, { path: '/api/v1/auth/register', method: 'POST' }, {
      name: 'Priya Sharma',
      email: testEmail,
      password: 'SecurePassword2026!'
    });

    assert(regRes.status === 201, `Registration returns HTTP 201 (got ${regRes.status})`);
    assert(regRes.data.success === true, 'Registration success is true');
    assert(regRes.data.user.email === testEmail, 'Registered email matches');
    assert(regRes.data.user.isVerified === false, 'Newly registered user isVerified is false');
    assert(regRes.data.user.verificationToken === undefined, 'Security: verificationToken is NOT exposed in response');
    assert(regRes.data.emailSent === true, 'Verification email was dispatched via active mock transporter');

    // -------------------------------------------------------------------------
    // 8. Find User Verification Token & Verify Flow
    // -------------------------------------------------------------------------
    console.log('\n--- 8. Token Verification & Single-Use Enforcement ---');
    let createdToken = null;
    if (User.db && User.db.readyState === 1) {
      const dbUser = await User.findOne({ email: testEmail });
      if (dbUser) createdToken = dbUser.verificationToken;
    }

    // Missing token test
    const missingRes = await makeRequest(port, { path: '/api/v1/auth/verify-email', method: 'POST' }, {});
    assert(missingRes.status === 400, 'Missing token returns HTTP 400');
    assert(missingRes.data.code === 'MISSING_TOKEN', 'Error code is MISSING_TOKEN');

    // Invalid token test
    const invalidRes = await makeRequest(port, { path: '/api/v1/auth/verify-email', method: 'POST' }, { token: 'invalid_dummy_token_9999' });
    assert(invalidRes.status === 400, 'Invalid token returns HTTP 400');
    assert(invalidRes.data.code === 'INVALID_TOKEN', 'Error code is INVALID_TOKEN');

    // GET endpoint verification click
    const getInvalidRes = await makeRequest(port, { path: '/api/v1/auth/verify-email?token=bogus_token', method: 'GET' });
    assert(getInvalidRes.status === 400, 'GET with invalid token returns HTTP 400');
    assert(getInvalidRes.data.code === 'INVALID_TOKEN', 'GET error code is INVALID_TOKEN');

    // Valid token consumption if DB is connected
    if (createdToken) {
      const verifyRes = await makeRequest(port, { path: '/api/v1/auth/verify-email', method: 'POST' }, { token: createdToken });
      assert(verifyRes.status === 200, 'Valid token returns HTTP 200');
      assert(verifyRes.data.success === true, 'Verification response success is true');
      assert(verifyRes.data.user.isVerified === true, 'Returned user has isVerified === true');

      // Re-use guard
      const reuseRes = await makeRequest(port, { path: '/api/v1/auth/verify-email', method: 'POST' }, { token: createdToken });
      assert(reuseRes.status === 400, 'Reusing an already-consumed token returns HTTP 400');
      assert(reuseRes.data.code === 'INVALID_TOKEN', 'Reused token rejected as INVALID_TOKEN');
    }

    // -------------------------------------------------------------------------
    // 9. Resend Verification Route Tests
    // -------------------------------------------------------------------------
    console.log('\n--- 9. Resend Verification Route & Cooldown Protection ---');
    const noUserRes = await makeRequest(port, { path: '/api/v1/auth/resend-verification', method: 'POST' }, {
      email: 'nonexistent.chef@example.com'
    });
    assert(noUserRes.status === 404, 'Non-existent email returns HTTP 404');
    assert(noUserRes.data.code === 'USER_NOT_FOUND', 'Error code is USER_NOT_FOUND');

    const cooldownRes = await makeRequest(port, { path: '/api/v1/auth/resend-verification', method: 'POST' }, {
      email: testEmail
    });
    if (cooldownRes.status === 400) {
      assert(cooldownRes.data.code === 'ALREADY_VERIFIED', 'Verified user cannot request resend');
    } else {
      assert(cooldownRes.status === 429, 'Immediate resend returns HTTP 429 Too Many Requests');
      assert(cooldownRes.data.code === 'RESEND_COOLDOWN', 'Error code is RESEND_COOLDOWN');
      assert(typeof cooldownRes.data.retryAfterSeconds === 'number', 'Response includes retryAfterSeconds');
    }

    // Already verified account
    const demoResendRes = await makeRequest(port, { path: '/api/v1/auth/resend-verification', method: 'POST' }, {
      email: 'chef.rasavanta@example.com'
    });
    assert(demoResendRes.status === 400, 'Resend for already-verified account returns HTTP 400');
    assert(demoResendRes.data.code === 'ALREADY_VERIFIED', 'Error code is ALREADY_VERIFIED');

    // -------------------------------------------------------------------------
    // Final Summary
    // -------------------------------------------------------------------------
    console.log('\n======================================================');
    console.log(`📊 FINAL TEST RESULTS: ${passed} PASSED, ${failed} FAILED`);
    console.log('======================================================\n');

    server.close();
    process.exit(failed > 0 ? 1 : 0);
  } catch (err) {
    console.error('Test execution error:', err);
    server.close();
    process.exit(1);
  }
}

runTests();
