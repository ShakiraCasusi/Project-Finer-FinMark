const express = require('express');
const router = express.Router();

// Controllers
const { register, login } = require('./auth.controller');

// Validators & Middleware
const { registerRules } = require('./validators/auth.validator');
const validate = require('./middlewares/validate');
const requireAuth = require('./middlewares/auth.middleware');

// Routes
router.post('/register', registerRules, validate, register);
router.post('/login', login);

// Protected Route using JWT
router.get('/protected', requireAuth, (req, res) => {
  res.json({
    message: `Welcome user ${req.user.userId}, you accessed a protected route.`,
  });
});

module.exports = router;


