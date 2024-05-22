const mongoose = require('mongoose');
const validator = require('validator');

const userSchema = new mongoose.Schema({
    id: { 
        type: Number, 
        required: true, 
        unique: true 
    },
    username: {
      type: String,
      required: true,
      unique: true,
      trim: true
    },
    password: {
      type: String,
      required: true,
      trim: true
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      validate: validator.isEmail
    },
    name: {
      type: String,
      required: false,
      trim: true,
      default: ""
    },
    role: {
      type: String,
      default: "user",
      trim: true
    },
    profilepic: {
      type: String,
      default: ""
    },
    favouriteRecipes: [{
      type: Number
    }]
  });


const User = mongoose.model('User', userSchema, 'user');


module.exports = User;
