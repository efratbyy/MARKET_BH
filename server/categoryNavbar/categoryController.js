const BigCategory = require("../models/mongooseValidation/BigCategory");
const { handleError } = require("../utils/handleErrors");

const getCategories = async (req, res) => {
  try {
    const categoriesFromDB = await BigCategory.find();
    console.log(categoriesFromDB);
    return res.send(categoriesFromDB);
  } catch (error) {
    return handleError(res, 404, `Mongoose Error: ${error.message}`);
  }
};

exports.getCategories = getCategories;
