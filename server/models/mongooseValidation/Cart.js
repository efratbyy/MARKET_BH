const mongoose = require("mongoose");
const Image = require("./Image");

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
  image: Image,
  brand: {
    type: String,
    trim: true,
    minLength: 2,
    maxLength: 20,
    lowercase: true,
    required: true,
  },
  note: {
    type: String,
    trim: false,
    maxLength: 15,
    lowercase: true,
  },
});

module.exports = CartProduct;
