const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

app.post('/api/login', (req, res) => {
  const { email, password } = req.body;
  // Dummy check: accept any non-empty email/password
  if (email && password) {
    return res.json({ success: true, message: 'Login successful!' });
  }
  res.status(400).json({ success: false, message: 'Missing credentials' });
});

app.listen(3000, () => console.log('Server running on http://localhost:3000'));