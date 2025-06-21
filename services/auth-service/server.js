require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 3001;

// Sequelize setup
const sequelize = require('./config/db');
const User = require('./models/User');
const ResetToken = require('./models/ResetToken');

// Middlewares
app.use(cors());
app.use(express.json());

// Routes
const resetPasswordRoutes = require('./routes/resetPassword');
const authLoginRoute = require('./routes/authLogin');
app.use('/auth', resetPasswordRoutes);
app.use('/auth', authLoginRoute);

// Health check
app.get('/', (req, res) => {
  res.send('Auth Service is running');
});

// Connect to DB and sync models
sequelize.authenticate()
  .then(() => {
    console.log('Database connected.');

    // Sync tables
    return Promise.all([
      User.sync({ alter: true }),
      ResetToken.sync({ alter: true })
    ]);
  })
  .then(() => {
    app.listen(port, () => {
      console.log(`Auth Service running on port ${port}`);
    });
  })
  .catch((err) => {
    console.error('DB connection failed:', err);
  });
