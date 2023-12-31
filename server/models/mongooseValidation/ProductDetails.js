const mongoose = require("mongoose");

const productDetails = new mongoose.Schema({
  weightTopDisplay: {
    type: Number, // 1
  },
  weightUnitTopDisplay: {
    type: String, // ליטר
  },

  weight: {
    type: Number, // 1000
  },
  weightUnit: {
    type: String, // ל-100 מ״ל
  },
  divideBy: {
    type: Number, // 100
  },
  isSodium: {
    type: Boolean,
  },
  isSugar: {
    type: Boolean,
  },
  isSaturatedFat: {
    type: Boolean,
  },
  isGreenMark: {
    type: Boolean,
  },
  isSupervised: {
    type: Boolean,
  },
  manufacturingCountry: { type: String },
  ingredients: { type: String },
  content: { type: String },
});

module.exports = productDetails;
