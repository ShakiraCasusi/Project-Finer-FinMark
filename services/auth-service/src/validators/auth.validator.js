const { body } = require('express-validator');

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const phoneRegex = /^\+63\d{10}$/;

exports.registerRules = [
  body('email')
    .matches(emailRegex)
    .withMessage('Invalid email format.'),
  body('password')
    .isLength({ min: 6 })
    .withMessage('Password must be at least 6 characters.'),
  body('phone')
    .optional()
    .matches(phoneRegex)
    .withMessage('Phone must match +63XXXXXXXXXX format.')
];
