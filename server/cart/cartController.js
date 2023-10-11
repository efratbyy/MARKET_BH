const Product = require("../models/mongooseValidation/Product");
const User = require("../models/mongooseValidation/User");
const { handleError } = require("../utils/handleErrors");

const addToCart = async (req, res) => {
  try {
    const { userId, barcode, amount } = req.params;
    const userFromDB = await User.findById(userId);
    if (!userFromDB) throw new Error("User not registered");
    const findProduct = userFromDB.cart.find(
      (product) => product.barcode === barcode
    );
    if (!findProduct) {
      const product = await Product.findOne({ barcode });
      console.log(product);
      const itemToAdd = {
        productName: product.title,
        price: product.price * amount,
        barcode: product.barcode,
        amount: amount,
      };
      userFromDB.cart.push(itemToAdd);
    } else {
      findProduct.price =
        (findProduct.price / findProduct.amount) * amount + findProduct.price;
      findProduct.amount += Number(amount);
    }
    const userUpdatedCart = await User.findByIdAndUpdate(userId, userFromDB, {
      new: true,
    });
    if (!userUpdatedCart) throw new Error("Add to cart failed!");
    res.status(201).send(userUpdatedCart);
  } catch (error) {
    return handleError(res, 404, `Mongoose Error: ${error.message}`);
  }
};

exports.addToCart = addToCart;
