const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const mongoose = require('mongoose');
const geminiService = require('./services/geminiService');
const recipeRoutes = require('./routes/recipeRoutes');
const rasabotRoutes = require('./routes/rasabotRoutes');
const pantryRoutes = require('./routes/pantryRoutes');
const authRoutes = require('./routes/authRoutes');
const shoppingListRoutes = require('./routes/shoppingListRoutes');

const app = express();

// Middlewares
app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));

// API Health Check
app.get('/api/health', (req, res) => {
  const dbConnected = mongoose.connection && mongoose.connection.readyState === 1;
  const geminiStatus = geminiService.getStatus();
  res.status(200).json({
    status: 'healthy',
    timestamp: new Date().toISOString(),
    service: 'RASAVANTA AI Backend API',
    database: {
      status: dbConnected ? 'connected' : 'disconnected',
      source: dbConnected ? 'mongodb_atlas' : 'offline_memory_fallback',
      host: dbConnected ? mongoose.connection.host : null,
      name: dbConnected ? mongoose.connection.name : null
    },
    gemini: {
      status: geminiStatus.configured ? 'configured' : 'unconfigured',
      model: geminiStatus.model,
      sdk: geminiStatus.sdk
    }
  });
});

// API Routes
app.use('/api/v1/recipes', recipeRoutes);
app.use('/api/v1/rasabot', rasabotRoutes);
app.use('/api/v1/pantry', pantryRoutes);
app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/basket', shoppingListRoutes);
app.use('/api/v1/shopping-list', shoppingListRoutes);

// 404 Handler
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: `API route ${req.originalUrl} not found`
  });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Unhandled Server Error:', err);
  res.status(500).json({
    success: false,
    message: 'Internal server error occurred',
    error: process.env.NODE_ENV === 'development' ? err.message : undefined
  });
});

module.exports = app;
