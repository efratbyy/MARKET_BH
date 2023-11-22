const mongoose = require("mongoose");

const Image = new mongoose.Schema({
  url: {
    type: String,
    minLength: 0,
    trim: true,
    lowercase: true,
  },
  alt: {
    type: String,
    minLength: 0,
    maxLength: 256,
    lowercase: true,
  },
});

module.exports = Image;
