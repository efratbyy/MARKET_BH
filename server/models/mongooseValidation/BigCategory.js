const mongoose = require("mongoose");
const MiddleCategory = require("./MiddleCategory");
const Image = require("./Image");

const schema = new mongoose.Schema({
  image: Image,
  code: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  data: [MiddleCategory],
});

const BigCategory = mongoose.model("categories", schema);

module.exports = BigCategory;
