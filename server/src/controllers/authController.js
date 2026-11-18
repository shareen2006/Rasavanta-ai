const User = require('../models/User');

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
