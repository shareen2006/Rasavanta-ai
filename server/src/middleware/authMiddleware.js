
const jwt = require('jsonwebtoken');

const MIN_SECRET_LENGTH = 32;

/**
 * Validates and retrieves the JWT_SECRET from environment variables.
 * Fails securely if JWT_SECRET is missing or insufficient.
 */
const getJwtSecret = () => {
  const secret = process.env.JWT_SECRET;
  if (!secret || typeof secret !== 'string' || secret.trim().length < MIN_SECRET_LENGTH) {
    const error = new Error('Security configuration error: JWT_SECRET environment variable is missing or shorter than 32 characters.');
    error.statusCode = 500;
    error.isSecurityConfigError = true;
    throw error;
  }
  return secret.trim();
};

/**
 * Authentication Middleware
 * Enforces cryptographic JWT verification on protected routes.
 * Derives authenticated user identity strictly from verified token subject.
 */
const protect = async (req, res, next) => {
  try {
    let secret;
    try {
      secret = getJwtSecret();
    } catch (configErr) {
      console.error('[Security Error]', configErr.message);
      return res.status(500).json({
        success: false,
        message: 'Authentication service is misconfigured. Please contact system administrator.',
        code: 'AUTH_CONFIG_ERROR'
      });
    }

    let token = null;
    const authHeader = req.headers.authorization;

    if (authHeader && typeof authHeader === 'string') {
      if (authHeader.startsWith('Bearer ')) {
        token = authHeader.slice(7).trim();
      } else if (authHeader.startsWith('bearer ')) {
        token = authHeader.slice(7).trim();
      }
    }

    if (!token) {
      return res.status(401).json({
        success: false,
        message: 'Access denied. Authentication token required.',
        code: 'NO_TOKEN'
      });
    }

    // Explicitly reject legacy unverified mock tokens (e.g. jwt_token_usr-...)
    if (token.startsWith('jwt_token_')) {
      return res.status(401).json({
        success: false,
        message: 'Legacy authentication token rejected. Please sign in again.',
        code: 'INVALID_TOKEN'
      });
    }

    let decoded;
    try {
      decoded = jwt.verify(token, secret, { algorithms: ['HS256'] });
    } catch (jwtErr) {
      if (jwtErr.name === 'TokenExpiredError') {
        return res.status(401).json({
          success: false,
          message: 'Authentication session expired. Please sign in again.',
          code: 'TOKEN_EXPIRED'
        });
      }
      return res.status(401).json({
        success: false,
        message: 'Invalid or forged authentication token.',
        code: 'INVALID_TOKEN'
      });
    }

    // Validate that the token payload contains an identified subject
    const userId = decoded.sub || decoded.id;
    if (!userId || typeof userId !== 'string') {
      return res.status(401).json({
        success: false,
        message: 'Invalid token claims: subject missing.',
        code: 'INVALID_CLAIMS'
      });
    }

    // Attach verified identity to request object
    req.user = {
      id: userId,
      email: decoded.email || null,
      role: decoded.role || 'Home Chef'
    };

    next();
  } catch (err) {
    console.error('Unhandled error in authMiddleware:', err);
    return res.status(500).json({
      success: false,
      message: 'Internal error during authentication verification.',
      code: 'AUTH_INTERNAL_ERROR'
    });
  }
};

/**
 * Optional Authentication Middleware
 * Populates req.user if a valid token is provided, but allows unauthenticated access.
 */
const optionalAuth = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return next();
    }
    const token = authHeader.slice(7).trim();
    if (!token || token.startsWith('jwt_token_')) {
      return next();
    }
    const secret = getJwtSecret();
    const decoded = jwt.verify(token, secret, { algorithms: ['HS256'] });
    const userId = decoded.sub || decoded.id;
    if (userId) {
      req.user = {
        id: userId,
        email: decoded.email || null,
        role: decoded.role || 'Home Chef'
      };
    }
  } catch {
    // Ignore invalid tokens on optional routes
  }
  next();
};

module.exports = {
  getJwtSecret,
  protect,
  optionalAuth
};
