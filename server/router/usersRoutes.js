const express = require("express");
const router = express.Router();
const { register } = require("../users/usersController");

router.post("/", register);

module.exports = router;
