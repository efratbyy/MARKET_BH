const mongoose = require("mongoose");
const CartProduct = require("./Cart");
const Purchase = require("./Purchase");

const schema = new mongoose.Schema({
  first: {
    type: String,
    trim: true,
    minLength: 2,
    maxLength: 256,
    lowercase: true,
    required: true,
  },
  last: {
    type: String,
    trim: true,
    minLength: 2,
    maxLength: 256,
    lowercase: true,
    required: true,
  },
  phone: {
    type: String,
    required: true,
    match: RegExp(/0[0-9]{1,2}\-?\s?[0-9]{3}\s?[0-9]{4}/),
  },
  email: {
    type: String,
    required: true,
    match: RegExp(/^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/),
    lowercase: true,
    trim: true,
    unique: true,
  },
  password: {
    type: String,
    match: RegExp(
      /((?=.*\d{1})(?=.*[A-Z]{1})(?=.*[a-z]{1})(?=.*[!@#$%^&*-]{1}).{8,20})/
    ),
    // /((?=.*\d{1})(?=.*[A-Z]{1})(?=.*[a-z]{1})(?=.*[!@#$%^&*-]{1}).{7,20})/
    required: true,
    trim: true,
  },
  city: {
    type: String,
    trim: true,
    minLength: 2,
    maxLength: 256,
    lowercase: true,
    required: true,
  },
  street: {
    type: String,
    trim: true,
    minLength: 2,
    maxLength: 256,
    lowercase: true,
    required: true,
  },
  houseNumber: {
    type: Number,
    minLength: 1,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  isGoogleSignup: {
    type: Boolean,
    default: false,
  },
  isBlocked: {
    type: Boolean,
    default: false,
  },
  isAdmin: {
    type: Boolean,
    default: false,
  },
  loginFailedCounter: {
    type: Number,
    default: false,
  },
  blockedTime: {
    type: Date,
    default: Date.now,
  },
  cart: [CartProduct],
  purchaseHistory: [Purchase],
});

const User = mongoose.model("user", schema);

module.exports = User;
