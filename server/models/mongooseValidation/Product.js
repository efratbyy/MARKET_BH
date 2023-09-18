const mongoose = require("mongoose");

const Image = new mongoose.Schema({
  url: {
    type: String,
    minLength: 14,
    trim: true,
    lowercase: true,
  },
  alt: {
    type: String,
    trim: true,
    minLength: 2,
    maxLength: 256,
    lowercase: true,
  },
});

const schema = new mongoose.Schema({
  title: {
    type: String,
    trim: true,
    minLength: 2,
    maxLength: 256,
    lowercase: true,
    required: true,
  },
  brand: {
    type: String,
    trim: true,
    minLength: 2,
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
  category: {
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
  image: Image,
});

const Product = mongoose.model("product", schema);

module.exports = Product;
