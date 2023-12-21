const express = require("express");
const router = express.Router();
const {
  addToCart,
  removeFromCart,
  getCart,
  addNote,
  getOutOfStockProducts,
} = require("../cart/cartController");
const auth = require("../authProviders/authService");

router.patch("/addToCart/:userId/:barcode/:amount", auth, addToCart);
router.patch("/addNote/:userId/:barcode", auth, addNote);
router.patch("/removeFromCart/:userId/:barcode/:amount", auth, removeFromCart);
router.get("/:userId", auth, getCart);
router.get("/out_of_stock/:userId", auth, getOutOfStockProducts);

module.exports = router;
