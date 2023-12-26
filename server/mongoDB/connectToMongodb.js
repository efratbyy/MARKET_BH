const config = require("config");
const ENVIRONMENT = config.get("NODE_ENV");

const connectToDb = () => {
  if (ENVIRONMENT === "development") require("./connectToMongodbLocally");
  if (ENVIRONMENT === "production") require("./connectToAtlas");
};

module.exports = connectToDb;
