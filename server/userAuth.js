// Backend Implementation (Node.js with Express)
// User Authentication

const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { Users } = require('./models-mongodb');

const router = express.Router();

router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  const user = await Users.findOne({ where: { email } });
  if (!user || !(await bcrypt.compare(password, user.password_hash))) {
    return res.status(401).json({ message: 'Invalid credentials' });
  }
  const token = jwt.sign({ userId: user.id }, 'secret_key', { expiresIn: '1h' });
  res.json({ token });
});

module.exports = router;