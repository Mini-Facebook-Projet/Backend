const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

// Route pour l'inscription d'un nouvel utilisateur
router.post('/Signup', userController.createUser);
// routes/userRoutes.js

router.post('/Signin', userController.authenticateUser);


// // Route pour l'authentification de l'utilisateur
// router.post('/Signin', userController.authenticateUser);

// // Route pour obtenir la liste des utilisateurs
// router.get('/users', userController.getAllUsers);

// // Route pour obtenir un utilisateur par son id  
// router.get('/:userId', userController.getUserById);

// // Route pour supprimer un utilisateur par son id
// router.delete('/:userId', userController.deleteUserById); 

module.exports = router;
