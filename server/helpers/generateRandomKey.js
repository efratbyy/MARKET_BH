const User = require("../models/mongooseValidation/User");
const { handleBadRequest } = require("../utils/handleErrors");

const generateRandomKey = () => {
  const characters =
    "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ!@";
  const length = 50;
  let orderNumber = "";

  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    orderNumber += characters[randomIndex];
  }

  return orderNumber;
};

const generateUniqueRandomKey = async () => {
  try {
    const random = generateRandomKey();

    const user = await User.findOne(
      { forgotPasswordKey: random },
      { forgotPasswordKey: 1, _id: 0 }
    );
    if (user) return generateUniqueRandomKey();
    return random;
  } catch (error) {
    return handleBadRequest("generateUniqueRandomKey", error);
  }
};

module.exports = generateUniqueRandomKey;
