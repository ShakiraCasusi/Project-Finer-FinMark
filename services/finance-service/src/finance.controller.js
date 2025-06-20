const db = require('../config/db');

exports.createTxn = async (req, res) => {
  const { user_id, amount } = req.body;
  try {
    const result = await db.query(
      'INSERT INTO transactions (user_id, amount) VALUES ($1, $2) RETURNING *',
      [user_id, amount]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.listTxn = async (_req, res) => {
  try {
    const result = await db.query('SELECT * FROM transactions ORDER BY id DESC');
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
