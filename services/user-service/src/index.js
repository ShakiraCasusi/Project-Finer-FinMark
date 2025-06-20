const express = require('express');
const bodyParser = require('body-parser');
require('dotenv').config();

const userRoutes = require('./user.routes'); 
const app = express();

app.use(bodyParser.json());
app.use('/user', userRoutes);

const PORT = process.env.PORT || 3002;
app.listen(PORT, () => {
  console.log(`User Service running on port ${PORT}`);
});
