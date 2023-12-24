// const express = require("express");
// const app = express();
const chalk = require("chalk");
// app.use(express.json());

const handleError = (res, status = 400, message = "Page Not Found!") => {
  console.log(chalk.redBright(message));
  return res.status(status).send(message);
};

exports.handleError = handleError;
