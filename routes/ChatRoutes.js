const express = require('express');
const router = express.Router();
const chatController = require('../controllers/ChatController')
const authMiddleware = require('../middleware/authMiddleware'); 

router.post('/chat',chatController.gptResponse)

module.exports = router