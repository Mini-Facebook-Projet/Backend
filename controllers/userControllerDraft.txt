const User = require('../models/UserModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');



// Logique pour créer un nouvel utilisateur
/*exports.createUser = async (req, res) => {
 
    await User.create(req.body)
    .then(data => res.send(data))
    .catch(err => console.log(err))

    // Hachez le mot de passe avec bcrypt
    //const hashedPassword = await bcrypt.hash(password, 10); // 10 est le coût de hachage

};*/


exports.createUser = async (req, res) => {
    try {
      const { name, email, password } = req.body;
  
      // Hachez le mot de passe avec bcrypt
      const hashedPassword = await bcrypt.hash(password, 10); 

      // Créez un nouvel utilisateur avec le mot de passe haché
      const newUser = new User({
        name: name,
        email: email,
        password: hashedPassword, 
      });
  
      // Enregistrez le nouvel utilisateur dans la base de données
      await newUser.save();
  
      res.status(201).json({ message: 'Utilisateur enregistré avec succès.' });
    } catch (error) {
      console.error('Erreur lors de l\'enregistrement de l\'utilisateur : ' + error);
      res.status(500).json({ error: 'Une erreur est survenue lors de l\'inscription.' });
    }
  };

  
// Logique d'authentification de l'utilisateur
exports.authenticateUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Affichez les données reçues dans la console
    console.log('Email reçu :', email);
    console.log('Mot de passe reçu :', password);

    // Recherche de l'utilisateur par email
    const user = await User.findOne({ email });

    // Vérifiez si l'utilisateur existe
    if (!user) {
      return res.status(401).json({ error: 'Email incorrect.' });
    }

    // Vérifiez le mot de passe
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(401).json({ error: ' mot de passe incorrect.' });
    }

    // Générez un jeton JWT
    const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, {
      expiresIn: '30d', 
    });

    res.status(200).json({ token });
  } catch (error) {
    console.error('Erreur lors de l\'authentification : ' + error);
    res.status(500).json({ error: 'Une erreur est survenue lors de l\'authentification.' });
  }
};


// Obtenir un utilisateur par son ID
exports.getUserById = async (req, res) => {
    try {

         // Déclarez et initialisez userId en utilisant req.params
      const userId = req.params.userId;

        // Log pour vérifier l'ID reçu
      console.log('ID utilisateur reçu :', userId);

      // Vérifiez si l'ID utilisateur est valide
      if (!mongoose.Types.ObjectId.isValid(userId)) {
        console.log('ID utilisateur non valide.');
        return res.status(400).json({ error: 'ID utilisateur non valide.' });
      }

  
      // Vérifiez si l'ID utilisateur est valide
      if (!mongoose.Types.ObjectId.isValid(userId)) {
        return res.status(400).json({ error: 'ID utilisateur non valide.' });
      }
  
      // Recherchez l'utilisateur par ID dans la base de données
      const user = await User.findById(userId);
  
      if (!user) {
        return res.status(404).json({ message: 'Utilisateur non trouvé' });
      }
  
      // Répondez avec les données de l'utilisateur
      res.status(200).json(user);
    } catch (error) {
      console.error('Erreur lors de la récupération de l\'utilisateur : ' + error);
      res.status(500).json({ error: 'Une erreur est survenue lors de la récupération de l\'utilisateur.' });
    }
  };




// Supprimer un utilisateur par ID
exports.deleteUserById = async (req, res) => {
    try {
      const userId = req.params.userId;
  
      // Vérifiez si l'ID utilisateur est valide
      if (!mongoose.Types.ObjectId.isValid(userId)) {
        return res.status(400).json({ error: 'ID utilisateur non valide.' });
      }
  
      // Recherchez l'utilisateur par ID et supprimez-le
      const deletedUser = await User.findByIdAndRemove(userId);
  
      if (!deletedUser) {
        return res.status(404).json({ message: 'Utilisateur non trouvé.' });
      }
  
      res.status(200).json({ message: 'Utilisateur supprimé avec succès.' });
    } catch (error) {
      console.error('Erreur lors de la suppression de l\'utilisateur : ' + error);
      res.status(500).json({ error: 'Une erreur est survenue lors de la suppression de l\'utilisateur.' });
    }
  };



// Obtenir la liste des utilisateurs
exports.getAllUsers = async (req, res) => {
  try {
    
    // Récupérez tous les utilisateurs depuis la base de données
    const users = await User.find();

    // Répondez avec la liste des utilisateurs en tant que JSON
    res.json(users);
  } catch (error) {
    console.error('Erreur lors de la récupération de la liste des utilisateurs : ' + error);
    res.status(500).json({ error: 'Une erreur est survenue lors de la récupération des utilisateurs.' });
  }
};

