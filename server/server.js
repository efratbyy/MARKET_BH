const express = require("express");
const app = express();
const chalk = require("chalk");
const config = require("config");
const router = require("./router/router");
// const cors = require("");
// const morganLogger = require("");

// app.use(morganLogger);
// app.use(cors);
app.use(express.json());
// app.use(router);
app.use(express.static("./public"));
app.use(express.text());

const PORT = config.get("PORT") || 9000;
app.listen(PORT, () => {
  console.log(chalk.blackBright(`Listening on: http://localhost: ${PORT}`));
});
