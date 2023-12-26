const jwt = require("jsonwebtoken");
const config = require("config");

const KEY = config.get("JWT_KEY");

const generateAuthToken = (user) => {
  const { _id, isAdmin, first, last } = user;
  const token = jwt.sign({ _id, isAdmin, first, last }, JWT_KEY);
  return token;
};

const verifyToken = (tokenFromClient) => {
  try {
    const userPayload = jwt.verify(tokenFromClient, KEY);
    return userPayload;
  } catch {
    return null;
  }
};

exports.generateAuthToken = generateAuthToken;
exports.verifyToken = verifyToken;
