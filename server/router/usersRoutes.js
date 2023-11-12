const express = require("express");
const router = express.Router();
const {
  register,
  login,
  checkout,
  purchaseHistory,
} = require("../users/usersController");
const auth = require("../authProviders/authService");

router.post("/register", register);
router.post("/login", login);
router.patch("/checkout/:userId", auth, checkout);
router.get("/purchase-history/:userId", auth, purchaseHistory);

module.exports = router;
