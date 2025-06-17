require('dotenv').config();
const express = require('express');
const cors = require('cors');
const routes = require('./auth.routes');

const app = express();
app.use(cors());
app.use(express.json());
app.use('/auth', routes);

const PORT = process.env.AUTH_PORT || 3001;
app.listen(PORT, () => {
  console.log(`Auth Service running on port ${PORT}`);
});

