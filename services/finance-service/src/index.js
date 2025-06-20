const express = require('express');
const cors = require('cors');
require('dotenv').config();

const financeRoutes = require('./finance.routes');

const app = express();
app.use(cors());
app.use(express.json());

app.use('/finance', financeRoutes);

app.listen(process.env.PORT, () => {
  console.log(`Finance-Service running on port ${process.env.PORT}`);
});
