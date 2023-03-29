const mongoose = require("mongoose");
const validator = require("validator");
const crypto = require("crypto");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: [true, "user must have a first name"],
    validate: {
      validator: function (value) {
        return value.length != 0;
      },
      message: "please provide a valid first name",
    },
  },
  lastName: {
    type: String,
    required: [true, "user must have a last name"],
    validate: {
      validator: function (value) {
        return value.length != 0;
      },
      message: "please provide a valid last name",
    },
  },
  email: {
    type: String,
    required: [true, "user must have an email"],
    unique: true,
    lowercase: true,
    validate: [validator.isEmail, "please provide a valid email"],
  },
  passwordResetToken: String,
  passwordResetExpires: Date,
  photo: {
    type: String,
    default: "default.jpg",
  },
  active: {
    type: Boolean,
    default: true,
    select: false,
  },
  passwordChangedAt: Date,

  password: {
    type: String,
    required: [true, "user must provoide a password"],
  },
  passwordConfirm: {
    type: String,
    validate: {
      validator: function (el) {
        return el === this.password;
      },
      message: "passwords are not the same",
    },
  },
  skills: {
    type: [String],
    required: [true, "user must have at least one skill"],
  },
  portfolio: {
    type: String,
  },
  hourlyRate: {
    type: Number,
  },
  rating: {
    type: Number,
  },
  avatar: {
    type: String,
  },
  dateJoined: {
    type: Date,
    default: Date.now,
  },
});


const User = mongoose.model("User", userSchema);

module.exports = User;
