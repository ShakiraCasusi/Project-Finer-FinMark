const express = require('express');
const router = express.Router();

const { register, login } = require('./auth.controller');
const { registerRules } = require('./validators/auth.validator');
const validate = require('./middlewares/validate');

router.post('/register', registerRules, validate, register);
router.post('/login', login);

module.exports = router;


