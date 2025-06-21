const express = require('express');
require('dotenv').config();

const authRoutes = require('./auth.routes');

const app = express();
app.use(express.json());

app.use(authRoutes);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`Auth Service running on port ${PORT}`));
