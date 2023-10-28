const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const authMiddleware = require('../middleware/authMiddleware')

// Route pour l'inscription d'un nouvel utilisateur
router.post('/Signup', userController.createUser);
// routes/userRoutes.js

router.post('/Signin', userController.authenticateUser);
router.post('/update/:id',authMiddleware,userController.updateUser)
router.get('/image/:id', authMiddleware,userController.getUserImage)


module.exports = router;
