const express = require('express');
const router = express.Router();

const { register, login } = require('./auth.controller');
const { registerRules } = require('./validators/auth.validator');
const validate = require('./middlewares/validate');
const requireAuth = require('./middlewares/auth.middleware');
const restrictToRole = require('./middlewares/role.middleware');

router.post('/register', registerRules, validate, register);
router.post('/login', login);

router.get('/protected', requireAuth, (req, res) => {
  res.json({ message: `Welcome user ${req.user.userId}, you accessed a protected route.` });
});

router.get('/admin', requireAuth, restrictToRole(['admin']), (req, res) => {
  res.json({ message: `Hello admin ${req.user.userId}, access granted.` });
});

module.exports = router;
