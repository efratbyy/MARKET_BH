const express = require("express");
const router = express.Router();
const auth = require("../authProviders/authService");
const {
  getCategories,
  getTranslatedCategoryCode,
} = require("../categoryNavbar/categoryController");

router.get("/", getCategories);
router.get("/:categoryCode", getTranslatedCategoryCode);

module.exports = router;
