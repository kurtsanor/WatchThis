const express = require('express');
const router = express.Router();
const roleCheck = require('../middleware/roleMiddleware');

// Admin-only
router.post('/add',
  roleCheck(['admin', 'editor']),
  (req, res) => {
    res.json({ message: "Trailer added successfully" });
  }
);

// User access
router.get('/view',
  roleCheck(['admin', 'editor', 'user']),
  (req, res) => {
    res.json({ message: "Trailer list" });
  }
);

module.exports = router;