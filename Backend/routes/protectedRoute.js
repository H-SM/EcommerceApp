const express = require('express');
const router = express.Router();
const verifyToken = require('../middleware/authMiddleware');

router.get('/protected', verifyToken, (req, res) => {
  res.status(200).json({ message: 'This is a protected route' });
});

module.exports = router;
