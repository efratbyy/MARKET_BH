const mongoose = require("mongoose");
const chalk = require("chalk");
const config = require("config");

const ENVIRONMENT = config.get("NODE_ENV");
// (PRODUCTION/DEVELOPMENT) קובע את סביבת העבודה
const DB_NAME = config.get("DB_NAME");
const DB_PASSWORD = config.get("DB_PASSWORD");

if (ENVIRONMENT === "development")
  mongoose
    .connect("mongodb://127.0.0.1:27017/Market_BH")
    .then(() =>
      console.log(chalk.magentaBright("Connected to mongoDB Locally!"))
    )
    .catch((error) =>
      console.log(chalk.redBright(`Could not connected to mongoDB: ${error}`))
    );

if (ENVIRONMENT === "production")
  mongoose
    .connect(
      `mongodb+srv://${DB_NAME}:${DB_PASSWORD}@efrat.a0lfqho.mongodb.net/Market_BH`
    )
    .then(() => console.log(chalk.magentaBright("Connected to mongoDb Atlas!")))
    .catch((error) =>
      console.log(
        chalk.redBright.bold(`Could not connect to mongoDb Atlas: ${error}`)
      )
    );
