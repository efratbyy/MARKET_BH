const express = require("express");
const router = express.Router();
const {
  addToCart,
  removeFromCart,
  getCart,
} = require("../cart/cartController");
const auth = require("../authProviders/authService");

router.patch("/addToCart/:userId/:barcode/:amount", auth, addToCart);
router.patch("/removeFromCart/:userId/:barcode/:amount", auth, removeFromCart);
router.get("/:userId", auth, getCart);

module.exports = router;
