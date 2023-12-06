const productJoiValidation = require("../models/joiValidation/productValidation");
const Product = require("../models/mongooseValidation/Product");
const { handleError } = require("../utils/handleErrors");

const getProducts = async (req, res) => {
  try {
    const products = await Product.find();
    return res.send(products);
  } catch (error) {
    return handleError(res, 404, `Mongoose Error: ${error.message}`);
  }
};

const getProductByBarcode = async (req, res) => {
  const { barcode } = req.params;

  try {
    const product = await Product.findOne({ barcode });
    return res.send(product);
  } catch (error) {
    return handleError(res, 404, `Mongoose Error: ${error.message}`);
  }
};

const addProduct = async (req, res) => {
  try {
    const user = req.user;
    const product = req.body;
    const { barcode } = product;
    const { error } = productJoiValidation(product);

    if (!user.isAdmin)
      throw new Error(
        "You must be an admin type user in order to create products"
      );

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

const editProduct = async (req, res) => {
  try {
    const user = req.user;
    const productToUpdate = req.body;
    const { error } = productJoiValidation(productToUpdate);
    if (!user.isAdmin)
      throw new Error(
        "You must be an admin type user in order to edit products"
      );
    if (error)
      return handleError(res, 400, `Joi Error: ${error.details[0].message}`);

    let updatedProduct = await Product.findOneAndUpdate(
      { barcode: productToUpdate.barcode },
      productToUpdate,
      {
        new: true,
      }
    );

    if (!updatedProduct) throw new Error("Product update failed !");

    res.status(201).send(updatedProduct);
  } catch (error) {
    return handleError(res, 404, `Mongoose Error: ${error.message}`);
  }
};

exports.getProducts = getProducts;
exports.getProductByBarcode = getProductByBarcode;
exports.addProduct = addProduct;
exports.editProduct = editProduct;
