const mongoose = require("mongoose");

const productDetails = new mongoose.Schema({
  weightDisplay: {
    type: Number, // 1
  },
  weightUnitDisplay: {
    type: String, // ליטר
  },

  weight: {
    type: Number, // 1000
  },
  weightUnit: {
    type: String, // ל-100 מ״ל
  },
});

module.exports = productDetails;
