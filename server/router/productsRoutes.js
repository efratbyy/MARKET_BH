const express = require("express");
const router = express.Router();
const { getProducts } = require("../products/productsController");

router.get("/", getProducts);

module.exports = router;
