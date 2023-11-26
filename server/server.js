const express = require("express");
const app = express();
const chalk = require("chalk");
const config = require("config"); // (DEVELOPMENT/PRODUCTION) מאפשר לעבור לסביבות עבודה שונות
const router = require("./router/router");
const cors = require("./middlewares/cors");
// const morganLogger = require("");
const {
  InitCategoriesData,
  InitUsersData,
  InitProductsData,
} = require("./initialData/initialDataService");

// app.use(morganLogger);
app.use(cors);
app.use(express.json());
app.use(router);
app.use(express.static("./public"));
app.use(express.text());

const PORT = config.get("PORT") || 9000;

app.listen(PORT, () => {
  console.log(chalk.blackBright(`Listening on: http://localhost: ${PORT}`));
  require("./mongoDB/connectToMongodb");

  InitCategoriesData("./initialData/Market_BH.categories.json");

  InitUsersData("./initialData/Market_BH.users.json");

  InitProductsData("./initialData/Market_BH.products.json");
});
