const express = require("express");
const router = express.Router();
const { handleError } = require("../utils/handleErrors");
const usersRoutes = require("./usersRoutes");
const productsRoutes = require("./productsRoutes");

router.use("/users", usersRoutes);
router.use("/products", productsRoutes);

router.use((req, res) => handleError(res));

module.exports = router;
