const productJoiValidation = require("../models/joiValidation/productValidation");
const Product = require("../models/mongooseValidation/Product");

const getProducts = async (req, res) => {
  try {
    const products = await Product.find();
    return res.send(products);
  } catch (error) {
    return handleError(res, 404, `Mongoose Error: ${error.message}`);
  }
};

const addProduct = async (req, res) => {
  try {
    const user = req.body;
    const product = req.body;
    const { userId } = req.params;
    const { barcode } = product;
    const { error } = productJoiValidation(product);

    if (user._id !== userId) throw new Error("Illegal action");

    // if (!user.isAdmin)
    //   throw new Error(
    //     "You must be an admin type user in order to create products"
    //   );

    if (error)
      return handleError(res, 400, `Joi Error: ${error.details[0].message}`);

    const isProductExistInDB = await Product.findOne({ barcode });
    if (isProductExistInDB) throw new Error("Product already exist!");

    const newProduct = new Product(product);

    const productFromDB = await newProduct.save();
    res.status(201).send(productFromDB);
  } catch (error) {
    return handleError(res, 404, `Mongoose Error: ${error.message}`);
  }
};

exports.getProducts = getProducts;
exports.addProduct = addProduct;
