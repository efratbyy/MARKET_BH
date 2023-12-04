const express = require("express");
const router = express.Router();
const auth = require("../authProviders/authService");
const { getProducts, addProduct } = require("../products/productsController");

router.get("/", getProducts);
router.post("/add-product", auth, addProduct);

module.exports = router;
