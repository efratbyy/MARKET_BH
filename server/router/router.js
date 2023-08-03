const express = require("express");
const router = express.Router();
const { handleError } = require("../utils/handleErrors");
const usersRoutes = require("./usersRoutes");

router.use("/users", usersRoutes);

router.use((req, res) => handleError(res));

module.exports = router;
