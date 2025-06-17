const { Pool } = require('pg');

const db = new Pool({
  connectionString: process.env.AUTH_DB_URL,
});

module.exports = db;
