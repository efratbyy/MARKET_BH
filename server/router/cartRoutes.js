const express = require("express");
const router = express.Router();
const { addToCart } = require("../cart/cartController");

router.patch("/addToCart/:userId/:barcode/:amount", addToCart);

module.exports = router;
