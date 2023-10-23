const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

// Route pour l'inscription d'un nouvel utilisateur
router.post('/Signup', userController.createUser);
// routes/userRoutes.js

router.post('/Signin', userController.authenticateUser);
router.post('/refresh-token',userController.refreshToken)


module.exports = router;
