const db = require('../config/db');

const getProfile = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await db.query('SELECT id, email, role FROM users WHERE id = $1', [id]);
    if (result.rows.length === 0) return res.status(404).json({ error: 'User not found' });
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch profile', details: err.message });
  }
};

module.exports = { getProfile };
