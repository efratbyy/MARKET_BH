const mongoose = require("mongoose");
const chalk = require("chalk");
const config = require("config");

console.log("Connecting to Atlas DB...");

// Determines the work environment (PRODUCTION/DEVELOPMENT)
const DB_NAME = process.env.DB_NAME || config.get("DB_NAME");
const DB_PASSWORD = process.env.DB_PASSWORD || config.get("DB_PASSWORD");

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
