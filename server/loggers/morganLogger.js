const morgan = require("morgan");
const chalk = require("chalk");
const { morganTime, morganDay } = require("../utils/timeService");
const { createFile } = require("./fileService");

const morganLogger = morgan((tokens, req, res) => {
  const morganString = [
    morganTime(),
    tokens.method(req, res),
    tokens.url(req, res),
    tokens.status(req, res),
    "-",
    tokens["response-time"](req, res),
    "MS",
  ].join(" ");
  if (tokens.status(req, res) >= 400) {
    // creating a file that:
    // morganDay() - the name of the file is based on the current day
    // ${morganString}\n - in a new line(/n) adding the morganString
    createFile(morganDay(), `${morganString}\n`);
    return chalk.redBright(morganString);
  }
  return chalk.cyanBright(morganString);
});

module.exports = morganLogger;
