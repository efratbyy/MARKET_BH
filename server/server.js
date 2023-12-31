const express = require("express");
const app = express();
const chalk = require("chalk");
const config = require("config"); // Allows you to move to different work environments (DEVELOPMENT/PRODUCTION)
const router = require("./router/router");
const cors = require("./middlewares/cors");
const morganLogger = require("./loggers/morganLogger");

const {
  InitCategoriesData,
  InitUsersData,
  InitProductsData,
} = require("./initialData/initialDataService");

const connectToDb = require("./mongoDB/connectToMongodb");

app.use(morganLogger);
app.use(cors);
app.use(express.json());
app.use(router);
app.use(express.static("./public"));
app.use(express.text());

const PORT = process.env.PORT || config.get("PORT") || 9000;

app.listen(PORT, () => {
  console.log(chalk.blackBright(`Listening on: http://localhost: ${PORT}`));
  connectToDb();

  InitCategoriesData("./initialData/Market_BH.categories.json");

  InitUsersData("./initialData/Market_BH.users.json");

  InitProductsData("./initialData/Market_BH.products.json");
});
