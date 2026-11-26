const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  id: {
    type: String,
    required: true,
    unique: true,
    index: true
  },
  name: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
    index: true
  },
  password: {
    type: String,
    required: function() {
      return this.authProvider === 'local';
    }
  },
  googleId: {
    type: String,
    sparse: true,
    index: true
  },
  authProvider: {
    type: String,
    enum: ['local', 'google'],
    default: 'local'
  },
  role: {
    type: String,
    default: 'Home Chef'
  },
  avatar: {
    type: String,
    default: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80'
  },
  favoriteRecipes: [{
    type: String
  }],
  preferences: {
    cuisine: { type: String, default: 'All' },
    diet: { type: String, default: 'All' },
    language: { type: String, default: 'en' }
  },
  isVerified: {
    type: Boolean,
    default: false,
    index: true
  },
  verificationToken: {
    type: String,
    sparse: true,
    index: true
  },
  verificationTokenExpiresAt: {
    type: Date
  },
  lastVerificationSentAt: {
    type: Date
  }
}, {
  timestamps: true
});

module.exports = mongoose.models.User || mongoose.model('User', UserSchema);
