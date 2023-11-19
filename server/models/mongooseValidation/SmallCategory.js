const mongoose = require("mongoose");

const SmallCategory = new mongoose.Schema({
  code: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
});

// const SmallCategory = mongoose.model("smallCategory", schema);

module.exports = SmallCategory;
