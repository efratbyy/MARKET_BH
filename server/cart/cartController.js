const Product = require("../models/mongooseValidation/Product");
const User = require("../models/mongooseValidation/User");
const { handleError } = require("../utils/handleErrors");

const addToCart = async (req, res) => {
  try {
    const user = req.user;
    const { userId, barcode, amount } = req.params;

    if (user._id !== userId) throw new Error("Illegal action");

    const userFromDB = await User.findById(userId);
    if (!userFromDB) throw new Error("User not registered");
    const findProduct = userFromDB.cart.find(
      (product) => product.barcode === barcode
    );
    if (!findProduct) {
      const product = await Product.findOne({ barcode });
      // console.log(product);
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

const removeFromCart = async (req, res) => {
  try {
    const user = req.user;
    const { userId, barcode, amount } = req.params;

    if (user._id !== userId) throw new Error("Illegal action");

    const userFromDB = await User.findById(userId);
    if (!userFromDB) throw new Error("User not registered");

    // const findProduct = userFromDB.cart.find(
    //   (product) => product.barcode === barcode
    // );

    // Checks if the product is in the cart
    const findProductIndex = userFromDB.cart.findIndex(
      (product) => product.barcode === barcode
    );
    if (findProductIndex === -1) {
      throw new Error("Product not found in the cart");
    }

    const costPerProduct =
      userFromDB.cart[findProductIndex].price /
      userFromDB.cart[findProductIndex].amount;
    userFromDB.cart[findProductIndex].amount -= Number(amount);
    userFromDB.cart[findProductIndex].price =
      costPerProduct * userFromDB.cart[findProductIndex].amount;
    if (userFromDB.cart[findProductIndex].amount === 0)
      userFromDB.cart.splice(findProductIndex, 1);

    const userUpdatedCart = await userFromDB.save();
    // const userUpdatedCart = await User.findByIdAndUpdate(userId, userFromDB, {
    //   new: true,
    // });

    if (!userUpdatedCart) throw new Error("Remove from cart failed!");
    res.status(201).send(userUpdatedCart);
  } catch (error) {
    return handleError(res, 404, `Mongoose Error: ${error.message}`);
  }
};

const getCart = async (req, res) => {
  try {
    const user = req.user;
    const { userId, barcode, amount } = req.params;

    if (user._id !== userId) throw new Error("Illegal action");

    const userFromDB = await User.findById(userId);
    if (!userFromDB) throw new Error("User not registered");
    return res.send(userFromDB.cart);
  } catch (error) {
    return handleError(res, 404, `Mongoose Error: ${error.message}`);
  }
};

exports.addToCart = addToCart;
exports.removeFromCart = removeFromCart;
exports.getCart = getCart;
