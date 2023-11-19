const express = require("express");
const router = express.Router();
const auth = require("../authProviders/authService");
const { getCategories } = require("../categoryNavbar/categoryController");

router.get("/", auth, getCategories);

module.exports = router;
