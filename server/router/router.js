const express = require("express");
const router = express.Router();
const { handleError } = require("../utils/handleErrors");

router.use((req, res) => handleError(res));

module.exports = router;
