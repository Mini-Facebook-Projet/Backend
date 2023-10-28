// controllers/userController.js

const User = require('../models/UserModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const objectId = require('mongoose').Types.ObjectId
const config = require('../config/config.js')

exports.createUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Checking if email exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: 'This email already exists.' });
    }

    // Haching password with bcrypt
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new user with hashed password
    const newUser = new User({
      name: name,
      email: email,
      password: hashedPassword,
    });

    // Persist new user
    await newUser.save();
    res.status(201).json({ status: 'ok' });
  } catch (error) {
    console.error('Erreur lors de l\'enregistrement de l\'utilisateur : ' + error);
    res.status(500).json({ error: 'Sorry, an error happened. Please, try later.' });
  }
};

exports.authenticateUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Recherchez l'utilisateur par email
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(401).json({ error: 'Incorrect email.' });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(401).json({ error: 'Incorrect password.' });
    }

    const token = jwt.sign({ _id: user._id }, config.JWT_SECRET, {
      expiresIn: config.JWT_TOKEN_LIFE_TME,
    });
    const refreshToken = jwt.sign({ _id: user._id }, config.JWT_SECRET, {
      expiresIn: config.JWT_REFRESH_TOKEN_LIFE_TIME,
    });
    // Inclure les informations de l'utilisateur dans la réponse
    const userResponse = {
      _id: user._id,
      name: user.name,
      email: user.email,
      image: user.image
    };
    // Renvoyer à la fois le token et les informations de l'utilisateur
    res.status(200).json({ token, user: userResponse, refreshToken });
  } catch (error) {
    console.error('Error during authentication: ' + error);
    res.status(500).json({ error: 'An error occurred during authentication.' });
  }
};

exports.updateUser = async (req, res) => {
  try {

    if (objectId.isValid(req.params.id) == false) {
      res.status(400).json({
        error: " id is not valid"
      })
    } else {
      const userId = req.params.id;
      const { name, password, image } = req.body;
      let updates = null;
      if (name && name.trim() !== '') {
        updates = { ...updates, name: name }
      }
      if (password && password.trim() !== '') {
        const hashedPassword = await bcrypt.hash(password, 10);
        updates = { ...updates, password: hashedPassword }
      }
      if (image && image.trim() !== '') {
        updates = { ...updates, image: image }
      }

      if (updates) {
        // Mettez à jour les données de l'utilisateur.
        const user = await User.findByIdAndUpdate(userId, updates, { new: true });

        if (!user) {
          return res.status(404).json({ error: 'User not found.' });
        }
        res.status(200).json(user);

      }
    }


  } catch (error) {
    console.error('Error updating user: ' + error);
    res.status(500).json({ error: 'An error occurred while updating the user.' });
  }
};

exports.getUserImage = async (req, res) => {
  try {
    const userId = req.params.id;

    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ error: 'User not found.' });
    }
    console.log(`user : `, user)
    const userImage = user.image;

    // if (!userImage) {
    //   return res.status(404).json({ error: 'User does not have an image.' });
    // }

    // Renvoyez l'image de l'utilisateur.
    res.status(200).json({ image: userImage });
  } catch (error) {
    console.error('Error getting user image: ' + error);
    res.status(500).json({ error: 'An error occurred while getting the user image.' });
  }
};
exports.refreshToken = (req, res) => {
  
  const refreshToken = req.body.refreshToken;
  if (!refreshToken) return res.sendStatus(403);

  jwt.verify(refreshToken, config.JWT_SECRET, (err, user) => {
    if (err) return res.sendStatus(403);
    const accessToken = jwt.sign({ _id: user._id }, config.JWT_SECRET, {
      expiresIn: config.JWT_TOKEN_LIFE_TME,
    });
    console.log('new token : ',accessToken)
    res.json({ accessToken });
  });
}
