const User = require("../models/mongooseValidation/User");
const lodash = require("lodash");
const { handleBadRequest } = require("../utils/handleErrors");

const generateOrderNumber = async () => {
  try {
    const random = lodash.random(1_000_000, 9_999_999);
    const user = await User.findOne(
      { "purchaseHistory.order.orderNumber": random },
      { purchaseHistory: 1, _id: 0 }
    );
    if (user) return generateOrderNumber();
    return random;
  } catch (error) {
    return handleBadRequest("generateOrderNumber", error);
  }
};

module.exports = generateOrderNumber;
