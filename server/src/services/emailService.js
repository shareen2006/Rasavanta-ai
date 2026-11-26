const nodemailer = require('nodemailer');
const { Resend } = require('resend');

/**
 * RASAVANTA AI Multi-Provider Email Service
 * Supports:
 *  1. Gmail SMTP (via Nodemailer with STARTTLS)
 *  2. Resend API (via @resend/resend)
 */

class EmailService {
  constructor() {
    this.provider = 'gmail';
    this.nodemailerTransporter = null;
    this.resendClient = null;
    this.customTransporter = null;
    this.customResendClient = null;
    this.fromEmail = null;
    this.init();
  }

  /**
   * Resolves the configured provider:
   * Priority: EMAIL_PROVIDER ('gmail' | 'smtp' | 'resend') -> auto-detect -> default 'gmail'
   */
  resolveProvider() {
    const requested = (process.env.EMAIL_PROVIDER || '').trim().toLowerCase();
    if (requested === 'gmail' || requested === 'smtp') {
      return 'gmail';
    }
    if (requested === 'resend') {
      return 'resend';
    }

    // Auto-detect based on available credentials if EMAIL_PROVIDER is unset
    if (process.env.SMTP_PASS && process.env.SMTP_PASS.trim().length > 0) {
      return 'gmail';
    }
    if (process.env.RESEND_API_KEY && process.env.RESEND_API_KEY.trim().length > 0) {
      return 'resend';
    }

    return 'gmail';
  }

  init() {
    this.provider = this.resolveProvider();

    // 1. Initialize Nodemailer (Gmail / SMTP)
    this.initNodemailer();

    // 2. Initialize Resend
    this.initResend();

    // 3. Resolve Default From Address
    this.resolveFromEmail();
  }

  initNodemailer() {
    if (this.customTransporter) {
      this.nodemailerTransporter = this.customTransporter;
      return;
    }

    const host = (process.env.SMTP_HOST || 'smtp.gmail.com').trim();
    const port = Number(process.env.SMTP_PORT) || 587;
    const user = (process.env.SMTP_USER || 'rasavantaai@gmail.com').trim();
    const rawPass = process.env.SMTP_PASS;
    const pass = rawPass && typeof rawPass === 'string' ? rawPass.trim() : null;

    try {
      this.nodemailerTransporter = nodemailer.createTransport({
        host,
        port,
        secure: port === 465, // true for port 465, false for 587
        requireTLS: port === 587, // enforce STARTTLS on port 587
        auth: {
          user,
          pass: pass || ''
        },
        tls: {
          rejectUnauthorized: true,
          minVersion: 'TLSv1.2'
        }
      });
    } catch (err) {
      console.warn('[EmailService] Failed to initialize Nodemailer transporter:', err.message);
      this.nodemailerTransporter = null;
    }
  }

  initResend() {
    if (this.customResendClient) {
      this.resendClient = this.customResendClient;
      return;
    }

    const rawKey = process.env.RESEND_API_KEY;
    const apiKey = rawKey && typeof rawKey === 'string' ? rawKey.trim() : null;

    if (apiKey) {
      try {
        this.resendClient = new Resend(apiKey);
      } catch (err) {
        console.warn('[EmailService] Failed to initialize Resend client:', err.message);
        this.resendClient = null;
      }
    } else {
      this.resendClient = null;
    }
  }

  resolveFromEmail() {
    const customFrom = (process.env.EMAIL_FROM || '').trim();

    if (this.provider === 'gmail') {
      const defaultGmailFrom = `RASAVANTA AI <${(process.env.SMTP_USER || 'rasavantaai@gmail.com').trim()}>`;
      if (customFrom && !customFrom.includes('resend.dev')) {
        this.fromEmail = customFrom;
      } else {
        this.fromEmail = defaultGmailFrom;
      }
      return;
    }

    // Provider is resend
    if (customFrom && !customFrom.includes('gmail.com')) {
      this.fromEmail = customFrom;
    } else {
      this.fromEmail = 'RASAVANTA AI <onboarding@resend.dev>';
    }
  }

  /**
   * Diagnostic status of email service
   */
  getStatus() {
    this.provider = this.resolveProvider();
    this.resolveFromEmail();

    return {
      configured: this.isConfigured(),
      provider: this.provider,
      from: this.fromEmail,
      clientUrl: this.getClientUrl(),
      smtp: {
        host: process.env.SMTP_HOST || 'smtp.gmail.com',
        port: Number(process.env.SMTP_PORT) || 587,
        user: process.env.SMTP_USER || 'rasavantaai@gmail.com',
        hasPass: Boolean(process.env.SMTP_PASS && process.env.SMTP_PASS.trim().length > 0)
      },
      resend: {
        hasKey: Boolean(process.env.RESEND_API_KEY && process.env.RESEND_API_KEY.trim().length > 0)
      }
    };
  }

  /**
   * Returns whether the active provider is configured and ready to dispatch
   */
  isConfigured() {
    const provider = this.resolveProvider();

    if (provider === 'gmail') {
      if (this.customTransporter) return true;
      const pass = process.env.SMTP_PASS;
      return Boolean(this.nodemailerTransporter && pass && pass.trim().length > 0);
    }

    if (provider === 'resend') {
      if (this.customResendClient) return true;
      const key = process.env.RESEND_API_KEY;
      return Boolean(this.resendClient && key && key.trim().length > 0);
    }

    return false;
  }

  /**
   * Resolves the frontend client base URL.
   * Priority: baseUrl override > CLIENT_URL > FRONTEND_URL > NODE_ENV fallback
   */
  getClientUrl(baseUrlOverride) {
    if (baseUrlOverride && typeof baseUrlOverride === 'string') {
      return baseUrlOverride.trim().replace(/\/+$/, '');
    }

    const candidate =
      process.env.CLIENT_URL ||
      process.env.FRONTEND_URL ||
      (process.env.NODE_ENV === 'production'
        ? 'https://rasavanta-ai.vercel.app'
        : 'http://localhost:5173');

    return candidate.trim().replace(/\/+$/, '');
  }

  /**
   * Generates the canonical verification URL
   * Format: ${CLIENT_URL}/verify-email?token=${token}
   */
  getVerificationUrl({ token, baseUrl }) {
    const clientUrl = this.getClientUrl(baseUrl);
    return `${clientUrl}/verify-email?token=${encodeURIComponent(token)}`;
  }

  /**
   * Generates branded HTML template for email verification
   */
  getVerificationHtml({ name, verificationUrl, token }) {
    const safeName = name ? name.trim() : 'Chef';

    return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Verify Your Email - RASAVANTA AI</title>
  <style>
    body {
      margin: 0;
      padding: 0;
      background-color: #F5F0E5;
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
      color: #303A32;
      -webkit-font-smoothing: antialiased;
    }
    .wrapper {
      width: 100%;
      background-color: #F5F0E5;
      padding: 40px 16px;
    }
    .container {
      max-width: 580px;
      margin: 0 auto;
      background-color: #FFFFFF;
      border-radius: 16px;
      overflow: hidden;
      box-shadow: 0 4px 20px rgba(36, 75, 57, 0.08);
      border: 1px solid rgba(217, 154, 56, 0.15);
    }
    .header {
      background: linear-gradient(135deg, #244B39 0%, #1A382A 100%);
      padding: 36px 32px;
      text-align: center;
    }
    .header h1 {
      margin: 0;
      color: #FFFFFF;
      font-size: 26px;
      letter-spacing: 2px;
      font-weight: 700;
    }
    .header p {
      margin: 8px 0 0 0;
      color: #D99A38;
      font-size: 13px;
      letter-spacing: 1px;
      text-transform: uppercase;
    }
    .content {
      padding: 36px 32px;
      line-height: 1.65;
    }
    .greeting {
      font-size: 18px;
      font-weight: 600;
      color: #244B39;
      margin-top: 0;
      margin-bottom: 16px;
    }
    .text {
      font-size: 15px;
      color: #4A5568;
      margin-bottom: 24px;
    }
    .btn-container {
      text-align: center;
      margin: 32px 0;
    }
    .btn {
      display: inline-block;
      background: linear-gradient(135deg, #D99A38 0%, #C48728 100%);
      color: #FFFFFF !important;
      font-weight: 600;
      font-size: 16px;
      padding: 14px 36px;
      text-decoration: none;
      border-radius: 8px;
      box-shadow: 0 4px 12px rgba(217, 154, 56, 0.35);
      letter-spacing: 0.5px;
    }
    .token-box {
      background-color: #F8F5EE;
      border: 1px dashed #D99A38;
      border-radius: 8px;
      padding: 14px;
      text-align: center;
      margin: 24px 0;
      font-family: monospace;
      font-size: 13px;
      color: #244B39;
      word-break: break-all;
    }
    .footer {
      background-color: #F8F5EE;
      padding: 24px 32px;
      text-align: center;
      font-size: 12px;
      color: #718096;
      border-top: 1px solid rgba(217, 154, 56, 0.1);
    }
    .footer p {
      margin: 4px 0;
    }
    .link {
      color: #D99A38;
      text-decoration: underline;
      word-break: break-all;
      font-size: 13px;
    }
  </style>
</head>
<body>
  <div class="wrapper">
    <div class="container">
      <div class="header">
        <h1>RASAVANTA AI</h1>
        <p>Rooted in Taste. Powered by Intelligence.</p>
      </div>
      <div class="content">
        <p class="greeting">Namaste, ${safeName}!</p>
        <p class="text">
          Thank you for joining <strong>RASAVANTA AI</strong>. To activate your full culinary experience—including AI recipe generation, personalized pantry tracking, and smart nutrition insights—please verify your email address.
        </p>
        <div class="btn-container">
          <a href="${verificationUrl}" class="btn" target="_blank" rel="noopener noreferrer">Verify My Email</a>
        </div>
        <p class="text" style="font-size: 13px; color: #718096;">
          This verification link is valid for <strong>24 hours</strong>. If you did not create an account on RASAVANTA AI, you can safely ignore this email.
        </p>
        <div class="token-box">
          Direct verification link:<br/>
          <a href="${verificationUrl}" class="link">${verificationUrl}</a>
        </div>
      </div>
      <div class="footer">
        <p><strong>RASAVANTA AI</strong> — An Intelligent Culinary Platform</p>
        <p>© 2026 RASAVANTA AI. All rights reserved.</p>
      </div>
    </div>
  </div>
</body>
</html>
    `.trim();
  }

  /**
   * Generates plain text email fallback
   */
  getVerificationText({ name, verificationUrl }) {
    const safeName = name ? name.trim() : 'Chef';
    return `Namaste, ${safeName}!\n\nThank you for joining RASAVANTA AI. Please verify your email address by visiting this link (valid for 24 hours):\n\n${verificationUrl}\n\nIf you did not create an account on RASAVANTA AI, you can safely ignore this email.\n\n© 2026 RASAVANTA AI — Rooted in Taste. Powered by Intelligence.`;
  }

  /**
   * Sends an email verification message via the active provider (Gmail SMTP or Resend)
   * @param {Object} options
   * @param {string} options.to - Recipient email address
   * @param {string} options.name - Recipient full name
   * @param {string} options.token - Cryptographic verification token
   * @param {string} [options.baseUrl] - Optional frontend base URL override
   * @returns {Promise<{ success: boolean, id: string, provider: string, recipient: string }>}
   */
  async sendVerificationEmail({ to, name, token, baseUrl }) {
    const provider = this.resolveProvider();

    if (!to || typeof to !== 'string' || !to.includes('@')) {
      const err = new Error('A valid recipient email address is required.');
      err.code = 'INVALID_RECIPIENT';
      throw err;
    }

    if (!token || typeof token !== 'string') {
      const err = new Error('A valid verification token is required.');
      err.code = 'INVALID_TOKEN';
      throw err;
    }

    const verificationUrl = this.getVerificationUrl({ token, baseUrl });
    const html = this.getVerificationHtml({ name, verificationUrl, token });
    const text = this.getVerificationText({ name, verificationUrl });
    const targetEmail = to.trim().toLowerCase();

    this.resolveFromEmail();
    const fromAddress = this.fromEmail;

    // --- Provider 1: Gmail SMTP via Nodemailer ---
    if (provider === 'gmail') {
      if (!this.customTransporter && (!process.env.SMTP_PASS || !process.env.SMTP_PASS.trim())) {
        const err = new Error('Gmail SMTP authentication password (SMTP_PASS) is not configured.');
        err.code = 'EMAIL_NOT_CONFIGURED';
        throw err;
      }

      if (!this.nodemailerTransporter) {
        this.initNodemailer();
      }

      try {
        const info = await this.nodemailerTransporter.sendMail({
          from: fromAddress,
          to: targetEmail,
          subject: 'Verify Your Email Address — RASAVANTA AI',
          html,
          text
        });

        const dispatchId = info.messageId || (typeof info.response === 'string' ? info.response : `smtp-${Date.now()}`);

        return {
          success: true,
          id: dispatchId,
          recipient: targetEmail,
          provider: 'gmail'
        };
      } catch (err) {
        console.error('[EmailService Nodemailer Error]', err.message);
        const sanitizedMsg = this.sanitizeErrorMessage(err.message);
        const smtpErr = new Error(sanitizedMsg);
        smtpErr.code = err.code || 'SMTP_DISPATCH_FAILED';
        smtpErr.statusCode = err.responseCode || 502;
        throw smtpErr;
      }
    }

    // --- Provider 2: Resend API ---
    if (provider === 'resend') {
      if (!this.customResendClient && (!process.env.RESEND_API_KEY || !process.env.RESEND_API_KEY.trim())) {
        const err = new Error('Resend email service is not configured. RESEND_API_KEY is missing.');
        err.code = 'EMAIL_NOT_CONFIGURED';
        throw err;
      }

      if (!this.resendClient) {
        this.initResend();
      }

      try {
        const { data, error } = await this.resendClient.emails.send({
          from: fromAddress,
          to: [targetEmail],
          subject: 'Verify Your Email Address — RASAVANTA AI',
          html
        });

        if (error) {
          const errorMsg = error.message || 'Resend API rejected the email request.';
          console.error('[EmailService Resend Error]', errorMsg);
          const customErr = new Error(errorMsg);
          customErr.code = error.name || 'RESEND_API_ERROR';
          customErr.statusCode = error.statusCode || 400;
          customErr.details = error;
          throw customErr;
        }

        if (!data || !data.id) {
          throw new Error('Resend did not return a valid dispatch confirmation ID.');
        }

        return {
          success: true,
          id: data.id,
          recipient: targetEmail,
          provider: 'resend'
        };
      } catch (err) {
        if (err.code === 'EMAIL_NOT_CONFIGURED' || err.code === 'INVALID_RECIPIENT' || err.code === 'INVALID_TOKEN') {
          throw err;
        }
        const sanitizedMsg = this.sanitizeErrorMessage(err.message);
        const resendErr = new Error(sanitizedMsg);
        resendErr.code = err.code || 'EMAIL_SEND_FAILED';
        resendErr.statusCode = err.statusCode || 500;
        throw resendErr;
      }
    }

    throw new Error(`Unsupported email provider: ${provider}`);
  }

  /**
   * Sanitizes error messages to guarantee no credentials or keys are leaked
   */
  sanitizeErrorMessage(rawMessage) {
    if (!rawMessage || typeof rawMessage !== 'string') return 'Email dispatch failed.';
    let cleaned = rawMessage.replace(/re_[A-Za-z0-9_]+/g, '[REDACTED_API_KEY]');
    if (process.env.SMTP_PASS) {
      cleaned = cleaned.replace(new RegExp(process.env.SMTP_PASS.trim(), 'g'), '[REDACTED_PASS]');
    }
    return cleaned;
  }

  // --- Testing Helpers ---
  setTransporter(customTransporter) {
    this.customTransporter = customTransporter;
    this.nodemailerTransporter = customTransporter;
  }

  setResendClient(customClient) {
    this.customResendClient = customClient;
    this.resendClient = customClient;
  }

  setProvider(providerName) {
    process.env.EMAIL_PROVIDER = providerName;
    this.provider = this.resolveProvider();
    this.resolveFromEmail();
  }

  reset() {
    this.customTransporter = null;
    this.customResendClient = null;
    this.init();
  }
}

module.exports = new EmailService();
