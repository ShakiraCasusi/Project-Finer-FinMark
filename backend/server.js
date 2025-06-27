const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const User = require('./models/User');

const app = express();

app.use(cors());
app.use(express.json());

// MongoDB connection
mongoose.connect('mongodb://localhost:27017/finer-finmark', {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log('MongoDB connected');
}).catch(err => {
  console.error('MongoDB connection error:', err);
});

// Register route
app.post('/api/register', async (req, res) => {
  try {
    const {
      firstName, lastName, email, password,
      company = '', revenue = '', role = '',
      location = '', employees = ''
    } = req.body;

    if (!firstName || !lastName || !email || !password) {
      return res.status(400).json({ success: false, message: 'Required fields missing.' });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ success: false, message: 'Email already exists' });
    }

    const newUser = new User({
      firstName, lastName, email, password,
      company, revenue, role, location, employees
    });

    await newUser.save();

    res.json({ success: true, message: 'User registered successfully' });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// Login route
app.post('/api/login', async (req, res) => {
  const { email, password } = req.body;
  console.log(`Login attempt: ${email}, ${password}`);

  try {
    const user = await User.findOne({ email, password });

    if (!user) {
      console.log('Login failed: invalid credentials');
      return res.status(401).json({ success: false, message: 'Invalid credentials' });
    }

    console.log('Login successful');
    const { password: _, ...userData } = user.toObject();
    res.json({ success: true, user: userData, message: 'Login successful' });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Server error during login' });
  }
});

// Export for tests
module.exports = app;

// Run server
if (require.main === module) {
  const PORT = 3000;
  app.listen(PORT, () => {
    console.log(`Backend running on http://localhost:${PORT}`);
  });
}
