const express = require("express");
const router = express.Router();
const {
  register,
  login,
  checkout,
  purchaseHistory,
  purchaseHistoryDetails,
  editUser,
  getUserById,
  getUsers,
  createResetPasswordKey,
} = require("../users/usersController");
const auth = require("../authProviders/authService");

router.post("/register", register);
router.post("/login", login);
router.patch("/checkout/:userId", auth, checkout);
router.get("/purchase-history/:userId", auth, purchaseHistory);
router.get(
  "/purchase-history-details/:userId/:orderNumber",
  auth,
  purchaseHistoryDetails
);
router.put("/edit-user", auth, editUser);
router.get("/", auth, getUsers);
router.get("/:userId", auth, getUserById);
router.patch("/forgot_password/:userEmail", createResetPasswordKey);

module.exports = router;
