const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const { OAuth2Client } = require('google-auth-library');
const { getJwtSecret } = require('../middleware/authMiddleware');

const googleClient = new OAuth2Client(
  process.env.GOOGLE_CLIENT_ID || '627856945618-viqvi6i8lg353ovl8om3uett19dk6v2q.apps.googleusercontent.com'
);

const BCRYPT_ROUNDS = 10;
const JWT_EXPIRES_IN = '7d';

const DEMO_CHEF = {
  id: 'usr-demo-chef',
  name: 'Chef Rasavanta',
  email: 'chef.rasavanta@example.com',
  password: 'TasteIntelligence2026', // Plaintext seed; migrated to bcrypt dynamically on first login
  role: 'Master Chef',
  avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80'
};

const inMemoryUsers = [DEMO_CHEF];

const isDbConnected = () => User.db && User.db.readyState === 1;

/**
 * Validates email structure conforming to standard RFC 5322 format
 */
const isValidEmail = (email) => {
  if (!email || typeof email !== 'string') return false;
  const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+$/;
  return emailRegex.test(email.trim());
};

/**
 * Signs a cryptographic JWT token for authenticated user session
 */
const signUserToken = (user) => {
  const secret = getJwtSecret();
  return jwt.sign(
    {
      id: user.id,
      email: user.email,
      role: user.role || 'Home Chef'
    },
    secret,
    {
      subject: String(user.id),
      algorithm: 'HS256',
      expiresIn: JWT_EXPIRES_IN
    }
  );
};

/**
 * Sanitizes user object to guarantee no password hashes or credentials leak in responses
 */
const sanitizeUser = (userDoc) => {
  if (!userDoc) return null;
  const obj = userDoc.toObject ? userDoc.toObject() : { ...userDoc };
  delete obj.password;
  delete obj.__v;
  return obj;
};

/**
 * Safely compares password and performs Just-In-Time (JIT) upgrade for legacy plaintext accounts.
 * Prevents double-hashing and ensures zero downtime migration.
 */
const verifyAndUpgradePassword = async (user, candidatePassword) => {
  if (!user || !user.password || typeof candidatePassword !== 'string') {
    return false;
  }

  const isBcrypt = typeof user.password === 'string' &&
    (user.password.startsWith('$2a$') || user.password.startsWith('$2b$'));

  if (isBcrypt) {
    return await bcrypt.compare(candidatePassword, user.password);
  }

  // Legacy plaintext match check
  if (user.password === candidatePassword) {
    // Transparently upgrade to bcrypt hash
    const salt = await bcrypt.genSalt(BCRYPT_ROUNDS);
    const hashedPassword = await bcrypt.hash(candidatePassword, salt);
    user.password = hashedPassword;

    if (user.save && typeof user.save === 'function') {
      try {
        await user.save();
        console.log(`[Security Migration] JIT password upgrade succeeded for user: ${user.email}`);
      } catch (saveErr) {
        console.warn(`[Security Migration Warning] Could not persist upgraded password for ${user.email}:`, saveErr.message);
      }
    }
    return true;
  }

  return false;
};

/**
 * User Login
 * Validates credentials via bcrypt, migrates legacy plaintext accounts, and issues real signed JWT.
 */
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const cleanEmail = (email || '').trim().toLowerCase();

    if (!cleanEmail || !password) {
      return res.status(400).json({
        success: false,
        message: 'Email and password are required.',
        code: 'MISSING_FIELDS'
      });
    }

    if (isDbConnected()) {
      let user = await User.findOne({ email: cleanEmail });

      // Auto-seed demo chef if logging in with demo chef email and not yet present in DB
      if (!user && cleanEmail === DEMO_CHEF.email) {
        const salt = await bcrypt.genSalt(BCRYPT_ROUNDS);
        const hashedDemoPassword = await bcrypt.hash(DEMO_CHEF.password, salt);
        user = await User.create({
          ...DEMO_CHEF,
          password: hashedDemoPassword
        });
      }

      if (!user) {
        return res.status(401).json({
          success: false,
          message: 'Invalid email or password. Please verify credentials.',
          code: 'INVALID_CREDENTIALS'
        });
      }

      const isMatch = await verifyAndUpgradePassword(user, password);
      if (!isMatch) {
        return res.status(401).json({
          success: false,
          message: 'Invalid email or password. Please verify credentials.',
          code: 'INVALID_CREDENTIALS'
        });
      }

      const token = signUserToken(user);
      const safeUser = sanitizeUser(user);

      return res.status(200).json({
        success: true,
        token,
        user: safeUser,
        source: 'mongodb'
      });
    }

    // In-memory fallback
    const memUser = inMemoryUsers.find(u => u.email.toLowerCase() === cleanEmail);
    if (!memUser) {
      return res.status(401).json({
        success: false,
        message: 'Invalid email or password. Please verify credentials.',
        code: 'INVALID_CREDENTIALS'
      });
    }

    const isMemMatch = await verifyAndUpgradePassword(memUser, password);
    if (!isMemMatch) {
      return res.status(401).json({
        success: false,
        message: 'Invalid email or password. Please verify credentials.',
        code: 'INVALID_CREDENTIALS'
      });
    }

    const token = signUserToken(memUser);
    const safeUser = sanitizeUser(memUser);

    return res.status(200).json({
      success: true,
      token,
      user: safeUser,
      source: 'memory'
    });
  } catch (error) {
    console.error('Error in login:', error);
    if (error.isSecurityConfigError) {
      return res.status(500).json({
        success: false,
        message: error.message,
        code: 'AUTH_CONFIG_ERROR'
      });
    }
    return res.status(500).json({
      success: false,
      message: 'An unexpected error occurred during login. Please try again.',
      code: 'LOGIN_ERROR'
    });
  }
};

/**
 * User Registration
 * Validates inputs, hashes password with bcrypt, persists user, and returns signed JWT.
 */
exports.register = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const cleanEmail = (email || '').trim().toLowerCase();
    const cleanName = (name || '').trim();

    if (!cleanName || cleanName.length < 2) {
      return res.status(400).json({
        success: false,
        message: 'Full name must be at least 2 characters.',
        code: 'INVALID_NAME'
      });
    }

    if (!isValidEmail(cleanEmail)) {
      return res.status(400).json({
        success: false,
        message: 'Please provide a valid email address.',
        code: 'INVALID_EMAIL'
      });
    }

    if (!password || typeof password !== 'string' || password.length < 6) {
      return res.status(400).json({
        success: false,
        message: 'Password must be at least 6 characters.',
        code: 'INVALID_PASSWORD'
      });
    }

    // Hash password with bcrypt
    const salt = await bcrypt.genSalt(BCRYPT_ROUNDS);
    const hashedPassword = await bcrypt.hash(password, salt);

    if (isDbConnected()) {
      const existing = await User.findOne({ email: cleanEmail });
      if (existing) {
        return res.status(409).json({
          success: false,
          message: 'An account with this email address already exists.',
          code: 'DUPLICATE_EMAIL'
        });
      }

      const newUser = await User.create({
        id: `usr-${Date.now()}`,
        name: cleanName,
        email: cleanEmail,
        password: hashedPassword,
        authProvider: 'local',
        role: 'Home Chef',
        avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=400&q=80',
        preferences: {
          cuisine: 'All',
          diet: 'All',
          language: 'en'
        }
      });

      const token = signUserToken(newUser);
      const safeUser = sanitizeUser(newUser);

      return res.status(201).json({
        success: true,
        token,
        user: safeUser,
        source: 'mongodb'
      });
    }

    // In-memory fallback
    const memExisting = inMemoryUsers.find(u => u.email.toLowerCase() === cleanEmail);
    if (memExisting) {
      return res.status(409).json({
        success: false,
        message: 'An account with this email address already exists.',
        code: 'DUPLICATE_EMAIL'
      });
    }

    const newMemUser = {
      id: `usr-${Date.now()}`,
      name: cleanName,
      email: cleanEmail,
      password: hashedPassword,
      authProvider: 'local',
      role: 'Home Chef',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=400&q=80',
      preferences: {
        cuisine: 'All',
        diet: 'All',
        language: 'en'
      }
    };
    inMemoryUsers.push(newMemUser);

    const token = signUserToken(newMemUser);
    const safeUser = sanitizeUser(newMemUser);

    return res.status(201).json({
      success: true,
      token,
      user: safeUser,
      source: 'memory'
    });
  } catch (error) {
    console.error('Error in register:', error);
    if (error.isSecurityConfigError) {
      return res.status(500).json({
        success: false,
        message: error.message,
        code: 'AUTH_CONFIG_ERROR'
      });
    }
    return res.status(500).json({
      success: false,
      message: 'An unexpected error occurred during registration. Please try again.',
      code: 'REGISTER_ERROR'
    });
  }
};

/**
 * Get Authenticated User Profile
 * Protected endpoint; retrieves profile strictly based on verified JWT subject.
 */
exports.getMe = async (req, res) => {
  try {
    const userId = req.user && req.user.id;
    if (!userId) {
      return res.status(401).json({
        success: false,
        message: 'Access denied. Valid authentication token required.',
        code: 'UNAUTHORIZED'
      });
    }

    if (isDbConnected()) {
      const user = await User.findOne({ id: userId });
      if (user) {
        return res.status(200).json({
          success: true,
          user: sanitizeUser(user),
          source: 'mongodb'
        });
      }
    }

    const memUser = inMemoryUsers.find(u => u.id === userId);
    if (memUser) {
      return res.status(200).json({
        success: true,
        user: sanitizeUser(memUser),
        source: 'memory'
      });
    }

    return res.status(404).json({
      success: false,
      message: 'User profile not found.',
      code: 'USER_NOT_FOUND'
    });
  } catch (error) {
    console.error('Error in getMe:', error);
    return res.status(500).json({
      success: false,
      message: 'Failed to retrieve user profile.',
      code: 'PROFILE_ERROR'
    });
  }
};

/**
 * Google OAuth 2.0 Authentication
 * Verifies ID token with Google's public keys, creates or links account, and returns signed JWT.
 */
exports.googleAuth = async (req, res) => {
  try {
    const { credential } = req.body;
    if (!credential || typeof credential !== 'string') {
      return res.status(400).json({
        success: false,
        message: 'Google credential token is required.',
        code: 'MISSING_GOOGLE_CREDENTIAL'
      });
    }

    const targetClientId = process.env.GOOGLE_CLIENT_ID || '627856945618-viqvi6i8lg353ovl8om3uett19dk6v2q.apps.googleusercontent.com';

    let payload;
    try {
      const ticket = await googleClient.verifyIdToken({
        idToken: credential,
        audience: targetClientId
      });
      payload = ticket.getPayload();
    } catch (verifyError) {
      return res.status(401).json({
        success: false,
        message: 'Invalid or expired Google credential token.',
        code: 'INVALID_GOOGLE_TOKEN',
        error: verifyError.message
      });
    }

    // Require verified email
    if (!payload || !payload.email_verified) {
      return res.status(403).json({
        success: false,
        message: 'Google account email is not verified. Please verify your email with Google first.',
        code: 'UNVERIFIED_EMAIL'
      });
    }

    const cleanEmail = (payload.email || '').trim().toLowerCase();
    const googleSub = payload.sub;
    const name = payload.name || cleanEmail.split('@')[0];
    const picture = payload.picture || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80';

    if (isDbConnected()) {
      let user = await User.findOne({ email: cleanEmail });

      if (user) {
        // Link existing user account safely
        let changed = false;
        if (!user.googleId) {
          user.googleId = googleSub;
          changed = true;
        }
        if (user.avatar && user.avatar.includes('unsplash') && picture) {
          user.avatar = picture;
          changed = true;
        }
        if (changed) {
          await user.save();
        }
      } else {
        // Create new Google-authenticated user
        user = await User.create({
          id: `usr-google-${Date.now()}`,
          name: name.trim(),
          email: cleanEmail,
          googleId: googleSub,
          authProvider: 'google',
          role: 'Home Chef',
          avatar: picture,
          favoriteRecipes: [],
          preferences: {
            cuisine: 'All',
            diet: 'All',
            language: 'en'
          }
        });
      }

      const token = signUserToken(user);
      const safeUser = sanitizeUser(user);

      return res.status(200).json({
        success: true,
        token,
        user: safeUser,
        source: 'mongodb'
      });
    }

    // In-memory fallback
    let memUser = inMemoryUsers.find(u => u.email.toLowerCase() === cleanEmail);
    if (memUser) {
      if (!memUser.googleId) memUser.googleId = googleSub;
      if (picture) memUser.avatar = picture;
    } else {
      memUser = {
        id: `usr-google-${Date.now()}`,
        name: name.trim(),
        email: cleanEmail,
        googleId: googleSub,
        authProvider: 'google',
        role: 'Home Chef',
        avatar: picture,
        preferences: {
          cuisine: 'All',
          diet: 'All',
          language: 'en'
        }
      };
      inMemoryUsers.push(memUser);
    }

    const token = signUserToken(memUser);
    const safeUser = sanitizeUser(memUser);

    return res.status(200).json({
      success: true,
      token,
      user: safeUser,
      source: 'memory'
    });
  } catch (error) {
    console.error('Error in googleAuth:', error);
    if (error.isSecurityConfigError) {
      return res.status(500).json({
        success: false,
        message: error.message,
        code: 'AUTH_CONFIG_ERROR'
      });
    }
    return res.status(500).json({
      success: false,
      message: 'Failed to authenticate with Google.',
      code: 'GOOGLE_AUTH_ERROR'
    });
  }
};
