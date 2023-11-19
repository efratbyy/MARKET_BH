const mongoose = require("mongoose");
const SmallCategory = require("./SmallCategory");
const Image = require("./Image");

const MiddleCategory = new mongoose.Schema({
  image: Image,

  code: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  data: [SmallCategory],
});

// const MiddleCategory = mongoose.model("middleCategory", schema);

module.exports = MiddleCategory;
