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

module.exports = Image;
