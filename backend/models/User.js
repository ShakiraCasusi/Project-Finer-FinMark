const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  email: { type: String, unique: true },
  password: String,
  company: String,
  revenue: String,
  role: String,
  location: String,
  employees: String
});

module.exports = mongoose.model('User', userSchema);
