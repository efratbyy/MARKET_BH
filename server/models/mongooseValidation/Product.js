const mongoose = require("mongoose");
const Image = require("./Image");
const productDetails = require("./ProductDetails");

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
    minLength: 1,
    required: true,
  },
  image: Image,
  details: productDetails,
  ingredients: {
    type: String,
    // trim: true,
    // minLength: 2,
    // maxLength: 256,
    // lowercase: true,
    // required: true,
  },
  content: {
    type: String,
    // trim: true,
    // minLength: 2,
    // maxLength: 256,
    // lowercase: true,
    // required: true,
  },
  manufacturingCountry: {
    type: String,
    // trim: true,
    // minLength: 2,
    // maxLength: 256,
    // lowercase: true,
    // required: true,
  },
});

const Product = mongoose.model("product", schema);

module.exports = Product;
