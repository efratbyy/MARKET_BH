const mongoose = require("mongoose");
const chalk = require("chalk");
const config = require("config");

// (PRODUCTION/DEVELOPMENT) קובע את סביבת העבודה
const DB_NAME = config.get("DB_NAME");
const DB_PASSWORD = config.get("DB_PASSWORD");

mongoose
  .connect(
    `mongodb+srv://${DB_NAME}:${DB_PASSWORD}@marketbh.vuyvihf.mongodb.net/Market_BH`
  )
  .then(() => console.log(chalk.magentaBright("Connected to mongoDb Atlas!")))
  .catch((error) =>
    console.log(
      chalk.redBright.bold(`Could not connect to mongoDb Atlas: ${error}`)
    )
  );
