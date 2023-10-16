// routes/protectedRoutes.js

const express = require('express');
const router = express.Router();
const authenticateToken = require('../middleware/authMiddleware');
const protectedController = require('../controllers/protectedController');

router.get('/protected-resource', authenticateToken, protectedController.getProtectedResource);

module.exports = router;
