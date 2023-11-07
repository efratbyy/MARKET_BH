const mongoose = require("mongoose");
const CartProduct = require("./Cart");

const Purchase = new mongoose.Schema({
  order: [CartProduct],
  orderNumber: Number,
  orderDate: {
    type: Date,
    default: Date.now,
  },
});

module.exports = Purchase;
