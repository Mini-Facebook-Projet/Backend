// middleware/authMiddleware.js

const jwt = require('jsonwebtoken');
const config = require('../config/config.js');

function authenticateToken(req, res, next) {
  const token = req.header('Authorization');
  if (!token) return res.status(401).send('Access denied. No token provided.');

  jwt.verify(token, config.JWT_SECRET, (err, user) => {
    if (err) return res.status(403).send('Invalid token.');
    req.user = user;
    next();
  });
}

module.exports = authenticateToken;
