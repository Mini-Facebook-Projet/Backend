const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const validator = require('validator');
const dotenv = require("dotenv");
const jwt = require("jsonwebtoken");
dotenv.config();

const userSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
    validate(value) {
      if (!validator.isEmail(value)) {
        throw new Error("Email is invalid");
      }
    },
  },
  password: {
    type: String,
    required: true,
    minlength: 6,
    trim: true,
    validate(value) {
      if (value.toLowerCase().includes("password")) {
        throw new Error('Password must not contain the word "password"');
      }
    },
  },
  image:{type:String, default : ''}  
});


module.exports = mongoose.model("user", userSchema);
