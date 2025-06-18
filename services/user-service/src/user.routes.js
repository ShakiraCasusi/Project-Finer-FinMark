const express = require('express');
const router = express.Router();
const { getProfile } = require('./user.controller');

router.get('/profile/:id', getProfile);

module.exports = router;
