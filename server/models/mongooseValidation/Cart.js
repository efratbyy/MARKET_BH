const mongoose = require("mongoose");

const CartProduct = new mongoose.Schema({
  productName: {
    type: String,
    trim: true,
    minLength: 2,
    maxLength: 256,
    lowercase: true,
    required: true,
  },
  price: {
    type: Number,
    trim: true,
    minLength: 2,
    maxLength: 256,
    lowercase: true,
    required: true,
  },
  amount: {
    type: Number,
    trim: true,
    minLength: 1,
    maxLength: 256,
    lowercase: true,
    required: true,
  },
  barcode: {
    type: String,
    trim: true,
    minLength: 2,
    maxLength: 20,
    lowercase: true,
    required: true,
  },
});

module.exports = CartProduct;
