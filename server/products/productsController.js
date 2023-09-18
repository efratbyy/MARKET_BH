const Product = require("../models/mongooseValidation/Product");

const getProducts = async (req, res) => {
  try {
    const products = await Product.find().sort({ createdAt: 1 });
    return res.send(products);
  } catch (error) {
    return handleError(res, 404, `Mongoose Error: ${error.message}`);
  }
};

exports.getProducts = getProducts;
