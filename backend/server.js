const express = require('express');
const cors = require('cors');
const fs = require('fs');
const bcrypt = require('bcrypt');
const app = express();

app.use(cors());
app.use(express.json());

const USERS_FILE = './users.json';

// Test route to verify correct server.js is running
app.get('/test', (req, res) => res.send('This is the correct server.js!'));

// Helper to read users
function readUsers() {
  if (!fs.existsSync(USERS_FILE)) return [];
  return JSON.parse(fs.readFileSync(USERS_FILE));
}

// Helper to write users
function writeUsers(users) {
  fs.writeFileSync(USERS_FILE, JSON.stringify(users, null, 2));
}

// Login endpoint (dummy logic)
app.post('/api/login', (req, res) => {
  const { email, password } = req.body;
  // Dummy check: accept any non-empty email/password
  if (email && password) {
    return res.json({ success: true, message: 'Login successful!' });
  }
  res.status(400).json({ success: false, message: 'Missing credentials' });
});

// Registration endpoint
app.post('/api/register', async (req, res) => {
  const { email, password } = req.body;
  console.log('Register attempt:', email);
  if (!email || !password) return res.status(400).json({ success: false, message: 'Missing fields' });
  const users = readUsers();
  if (users.find(u => u.email === email)) {
    console.log('Email already registered:', email);
    return res.status(400).json({ success: false, message: 'Email already registered' });
  }
  const hashed = await bcrypt.hash(password, 10);
  users.push({ email, password: hashed });
  writeUsers(users);
  console.log('User registered and written to file:', email);
  res.json({ success: true, message: 'Registration successful!' });
});

app.listen(3000, () => console.log('Server running on http://localhost:3000'));