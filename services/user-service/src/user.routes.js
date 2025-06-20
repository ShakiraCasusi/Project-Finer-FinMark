const express = require('express');
const router = express.Router();

// Demo endpoint: GET /user/profile/:id
router.get('/profile/:id', async (req, res) => {
  const { id } = req.params;

  // Replace with DB logic later
  res.json({
    id,
    name: `User ${id}`,
    email: `user${id}@example.com`
  });
});

module.exports = router;
