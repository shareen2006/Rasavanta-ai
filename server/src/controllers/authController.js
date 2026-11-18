const User = require('../models/User');
const { OAuth2Client } = require('google-auth-library');

const googleClient = new OAuth2Client(process.env.GOOGLE_CLIENT_ID || '627856945618-viqvi6i8lg353ovl8om3uett19dk6v2q.apps.googleusercontent.com');

/**
 * Controller for User Authentication
 * Seamlessly persists registered users and credentials in MongoDB Atlas when connected,
 * with fallback to memory if offline.
 */

const DEMO_CHEF = {
  id: 'usr-demo-chef',
  name: 'Chef Rasavanta',
  email: 'chef.rasavanta@example.com',
  password: 'TasteIntelligence2026',
  role: 'Master Chef',
  avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80'
};

const inMemoryUsers = [DEMO_CHEF];

const isDbConnected = () => User.db && User.db.readyState === 1;

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const cleanEmail = (email || '').trim().toLowerCase();

    if (isDbConnected()) {
      let user = await User.findOne({ email: cleanEmail });
      
      // Auto-seed demo chef if logging in with demo credentials
      if (!user && cleanEmail === DEMO_CHEF.email) {
        user = await User.create(DEMO_CHEF);
      }

      if (!user || user.password !== password) {
        return res.status(401).json({
          success: false,
          message: 'Invalid email or password. Please verify credentials.'
        });
      }

      const userObj = user.toObject ? user.toObject() : user;
      delete userObj.password;

      return res.status(200).json({
        success: true,
        token: `jwt_token_${user.id}_${Date.now()}`,
        user: userObj,
        source: 'mongodb'
      });
    }

    // In-memory fallback
    const memUser = inMemoryUsers.find(u => u.email.toLowerCase() === cleanEmail);
    if (!memUser || memUser.password !== password) {
      return res.status(401).json({
        success: false,
        message: 'Invalid email or password. Please verify credentials.'
      });
    }

    const { password: _, ...safeUser } = memUser;
    return res.status(200).json({
      success: true,
      token: `jwt_token_${memUser.id}_${Date.now()}`,
      user: safeUser,
      source: 'memory'
    });
  } catch (error) {
    console.error('Error in login:', error);
    return res.status(500).json({ success: false, message: error.message });
  }
};

exports.register = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const cleanEmail = (email || '').trim().toLowerCase();

    if (!cleanEmail || !password || !name) {
      return res.status(400).json({
        success: false,
        message: 'Name, email, and password are required.'
      });
    }

    if (isDbConnected()) {
      const existing = await User.findOne({ email: cleanEmail });
      if (existing) {
        return res.status(409).json({
          success: false,
          message: 'An account with this email address already exists.'
        });
      }

      const newUser = await User.create({
        id: `usr-${Date.now()}`,
        name: name.trim(),
        email: cleanEmail,
        password,
        role: 'Home Chef',
        avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=400&q=80'
      });

      const userObj = newUser.toObject();
      delete userObj.password;

      return res.status(201).json({
        success: true,
        token: `jwt_token_${newUser.id}_${Date.now()}`,
        user: userObj,
        source: 'mongodb'
      });
    }

    // In-memory fallback
    const memExisting = inMemoryUsers.find(u => u.email.toLowerCase() === cleanEmail);
    if (memExisting) {
      return res.status(409).json({
        success: false,
        message: 'An account with this email address already exists.'
      });
    }

    const newMemUser = {
      id: `usr-${Date.now()}`,
      name: name.trim(),
      email: cleanEmail,
      password,
      role: 'Home Chef',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=400&q=80'
    };
    inMemoryUsers.push(newMemUser);

    const { password: _, ...safeUser } = newMemUser;
    return res.status(201).json({
      success: true,
      token: `jwt_token_${newMemUser.id}_${Date.now()}`,
      user: safeUser,
      source: 'memory'
    });
  } catch (error) {
    console.error('Error in register:', error);
    return res.status(500).json({ success: false, message: error.message });
  }
};

exports.getMe = async (req, res) => {
  return res.status(200).json({
    success: true,
    user: DEMO_CHEF
  });
};

exports.googleAuth = async (req, res) => {
  try {
    const { credential } = req.body;
    if (!credential) {
      return res.status(400).json({
        success: false,
        message: 'Google credential token is required.'
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
        error: verifyError.message
      });
    }

    // Require verified email
    if (!payload || !payload.email_verified) {
      return res.status(403).json({
        success: false,
        message: 'Google account email is not verified. Please verify your email with Google first.'
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

      const userObj = user.toObject ? user.toObject() : user;
      if (userObj.password) delete userObj.password;

      return res.status(200).json({
        success: true,
        token: `jwt_token_${user.id}_${Date.now()}`,
        user: userObj,
        source: 'mongodb'
      });
    }

    // Resilient in-memory fallback
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
        avatar: picture
      };
      inMemoryUsers.push(memUser);
    }

    const { password: _, ...safeUser } = memUser;
    return res.status(200).json({
      success: true,
      token: `jwt_token_${memUser.id}_${Date.now()}`,
      user: safeUser,
      source: 'memory'
    });
  } catch (error) {
    console.error('Error in googleAuth:', error);
    return res.status(500).json({ success: false, message: error.message });
  }
};
