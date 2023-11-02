const mongoose = require("mongoose");
const CartProduct = require("./Cart");

const Purchase = new mongoose.Schema({
  order: [CartProduct],
  orderDate: {
    type: Date,
    default: Date.now,
  },
});

module.exports = Purchase;
