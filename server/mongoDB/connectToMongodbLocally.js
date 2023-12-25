const mongoose = require("mongoose");
const chalk = require("chalk");

mongoose
  .connect("mongodb://127.0.0.1:27017/Market_BH")
  .then(() => console.log(chalk.magentaBright("Connected to mongoDB Locally!")))
  .catch((error) =>
    console.log(chalk.redBright(`Could not connected to mongoDB: ${error}`))
  );
