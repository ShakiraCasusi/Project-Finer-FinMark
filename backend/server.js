const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const app = express();

app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/finmark', { useNewUrlParser: true, useUnifiedTopology: true });

// User schema
const userSchema = new mongoose.Schema({
  email: { type: String, unique: true },
  password: String
});
const User = mongoose.model('User', userSchema);

// Login endpoint
app.post('/api/login', async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (user && await bcrypt.compare(password, user.password)) {
    return res.json({ success: true, message: 'Login successful!' });
  }
  res.status(400).json({ success: false, message: 'Invalid credentials' });
});

// Registration endpoint
app.post('/api/register', async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) return res.status(400).json({ success: false, message: 'Missing fields' });
  if (await User.findOne({ email })) {
    return res.status(400).json({ success: false, message: 'Email already registered' });
  }
  const hashed = await bcrypt.hash(password, 10);
  await User.create({ email, password: hashed });
  res.json({ success: true, message: 'Registration successful!' });
});

// Forgot password endpoint
app.post('/api/forgot-password', async (req, res) => {
  const { email } = req.body;
  const user = await User.findOne({ email });
  if (!user) return res.status(400).json({ success: false, message: 'Email not found' });
  // In real app, send email with reset link/token
  res.json({ success: true, message: 'Password reset link sent (simulated).' });
});

app.listen(3000, () => console.log('Server running on http://localhost:3000'));

module.exports = app;