const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const authRoutes = require('./auth.routes');

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());
app.use('/auth', authRoutes);

app.listen(process.env.PORT, () => {
  console.log(`Auth Service running on port ${process.env.PORT}`);
});

module.exports = app;
