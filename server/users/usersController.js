const registerJoiValidationSchema = require("../models/joiValidation/registerValidation");
const { handleError } = require("../utils/handleErrors");
const User = require("../models/mongooseValidation/User");
const bcrypt = require("bcryptjs");
const config = require("config");
const jwt = require("jsonwebtoken");
const Purchase = require("../models/mongooseValidation/Purchase");
const generateOrderNumber = require("../helpers/generateOrderNumber");
const generateUniqueRandomKey = require("../helpers/generateRandomKey");
const Product = require("../models/mongooseValidation/Product");
const JWT_KEY = config.get("JWT_KEY");

const register = async (req, res) => {
  try {
    const user = req.body;
    const { email } = user;
    // return schema

    const { error } = registerJoiValidationSchema.validate(user, {});

    if (error)
      return handleError(res, 400, `Joi Error: ${error.details[0].message}`);
    const isUserExistInDB = await User.findOne({ email });
    if (isUserExistInDB) throw new Error("User already registered");
    const newUser = new User(user);

    // encrypt user password
    newUser.password = bcrypt.hashSync(newUser.password, 10);

    const userFromDB = await newUser.save();
    const { _id, isAdmin, first, last } = userFromDB;
    const token = jwt.sign({ _id, isAdmin, first, last }, JWT_KEY);
    res.status(201).send(token);
  } catch (error) {
    return handleError(res, 404, `Mongoose Error: ${error.message}`);
  }
};

const login = async (req, res) => {
  try {
    const user = req.body;
    const { email } = user;

    const userInDB = await User.findOne({ email });
    if (!userInDB)
      throw new Error("Authentication Error: Invalid email or password");
    if (userInDB.isGoogleSignup == true)
      throw new Error("Authentication Error: Use Google login");
    const isPasswordValid = bcrypt.compareSync(
      user.password,
      userInDB.password
    );

    if (!isPasswordValid) {
      userInDB.loginFailedCounter += 1;
      if (userInDB.loginFailedCounter >= 3) {
        //במידה ושווה או גדול ל 3 אז ייחסם
        userInDB.isBlocked = true;
        userInDB.blockedTime = new Date();
        await User.findByIdAndUpdate(userInDB.id, userInDB);
        throw new Error("Authentication Error: User is Blocked!");
      }
      await User.findByIdAndUpdate(userInDB.id, userInDB);
      throw new Error("Authentication Error: Invalid email or password");
    } else if (!userInDB.isBlocked) {
      // במידה ולא חסום והכניס מייל וסיסמא נכונים אז יוכנס למערכת
      const { _id, isAdmin, email, first, last } = userInDB;
      userInDB.loginFailedCounter = 0;
      await User.findByIdAndUpdate(userInDB.id, userInDB);
      const token = jwt.sign({ _id, isAdmin, first, last }, JWT_KEY);
      res.send(token);
    } else {
      const twentyFourHoursBefore = new Date(
        new Date().getTime() - 24 * 60 * 60 * 1000 // המרה ל-24 שעות
      );
      if (userInDB.blockedTime < twentyFourHoursBefore) {
        // במידה ועברו 24 שעות והמשתמש ביצע כניסה עם מייל וסיסמא נכונים אז כל השדות יתאפסו
        userInDB.isBlocked = false;
        userInDB.blockedTime = new Date();
        userInDB.loginFailedCounter = 0;
        await User.findByIdAndUpdate(userInDB.id, userInDB);
        const { _id, isAdmin, email, first, last } = userInDB;
        const token = jwt.sign({ _id, isAdmin, first, last }, JWT_KEY);
        res.send(token);
      } else {
        const currentTime = new Date();

        // target => release time
        const target = new Date(userInDB.blockedTime);
        target.setDate(target.getDate() + 1); // adding 24 hours to blocked time to get release time

        const leftTime = target - currentTime;
        const seconds = Math.floor((leftTime / 1000) % 60);
        const minutes = Math.floor((leftTime / (1000 * 60)) % 60);
        const hours = Math.floor((leftTime / (1000 * 60 * 60)) % 24);
        throw new Error(
          ` עקב ריבוי ניסיונות כושלים חשבונך נחסם, ניתן לנסות שנית בעוד:  ${hours}:${minutes}:${String(
            seconds
          ).padStart(2, "0")}`
        );
      }
    }
  } catch (error) {
    const isAuthError = error.message.includes("Authentication Error");
    return handleError(res, isAuthError ? 403 : 500, `שגיאה: ${error.message}`);
  }
};
const updateInventory = async (cart) => {
  for (let productInCart of cart) {
    const product = await Product.findOne({ barcode: productInCart.barcode });

    product.inventory -= productInCart.amount;

    await Product.findByIdAndUpdate(product._id, product, {
      new: true,
    });
  }
};

// Move cart to parches history
const checkout = async (req, res) => {
  try {
    const user = req.user;
    const { userId } = req.params;
    if (user._id !== userId) throw new Error("Illegal action");
    const userFromDB = await User.findById(userId);
    if (!userFromDB) throw new Error("User not registered");

    // for each item in cart remove inventory of product
    await updateInventory(userFromDB.cart);
    // insert cart to purchase history and clean cart
    userFromDB.purchaseHistory.push({
      orderNumber: await generateOrderNumber(),
      order: userFromDB.cart,
    });
    userFromDB.cart = [];

    const userUpdated = await User.findByIdAndUpdate(userId, userFromDB, {
      new: true,
    });
    if (!userUpdated) throw new Error("Purchase failed !");

    res
      .status(201)
      .send(
        userUpdated.purchaseHistory[
          userUpdated.purchaseHistory.length - 1
        ].orderNumber.toString()
      );
  } catch (error) {
    return handleError(res, 404, `Mongoose Error: ${error.message}`);
  }
};

const purchaseHistory = async (req, res) => {
  try {
    const user = req.user;
    const { userId } = req.params;

    if (user._id !== userId) throw new Error("Illegal action");

    const userFromDB = await User.findById(userId);
    if (!userFromDB) throw new Error("User not registered");
    return res.send(userFromDB.purchaseHistory);
  } catch (error) {
    return handleError(res, 404, `Mongoose Error: ${error.message}`);
  }
};

const purchaseHistoryDetails = async (req, res) => {
  try {
    const user = req.user;
    const { userId, orderNumber } = req.params;

    if (user._id !== userId) throw new Error("Illegal action");

    const userFromDB = await User.findById(userId);
    if (!userFromDB) throw new Error("User not registered");
    const matchOrder = userFromDB.purchaseHistory.find(
      (purchase) => purchase.orderNumber == orderNumber
    );
    return res.send(matchOrder);
  } catch (error) {
    return handleError(res, 404, `Mongoose Error: ${error.message}`);
  }
};

const editUser = async (req, res) => {
  try {
    const userToUpdate = req.body;
    const { _id } = req.user;

    const { error } = registerJoiValidationSchema.validate(userToUpdate, {
      stripUnknown: true, // if the request body contains extra fields that are not specified in the Joi schema, those fields will be stripped from the userToUpdate object before validation
      allowUnknown: true, // This allows additional keys that are not defined in the schema to be present in the object without triggering a validation error.
    });

    if (error)
      return handleError(res, 400, `Joi Error: ${error.details[0].message}`);

    // Check if the login user ( that actual connected) exist in the DB
    const loginUser = await User.findById(_id);

    // Not Authorized:
    // 1. There is no login user
    // 2. The login user try to update another user (compare by email) and he is not an Admin
    if (
      !loginUser ||
      (loginUser &&
        !loginUser.isAdmin &&
        loginUser.email !== userToUpdate.email)
    ) {
      return handleError(res, 404, `UnAuthorized Access!`);
    }

    // search for the user to update in the DB
    const userToUpdateFromDB = await User.findOne({
      email: userToUpdate.email,
    });

    // In case, the user to update email does not exist in the DB
    if (!userToUpdateFromDB) {
      return handleError(res, 404, `User To Update does not exist in the DB`);
    }

    // If not admin, Check if the userToUpdate password is match to the existing one in the DB
    // If admin, the new password is not relevant and the password will be the same as the one in the DB.
    if (
      (!loginUser.isAdmin &&
        !bcrypt.compareSync(
          userToUpdate.password,
          userToUpdateFromDB.password
        )) ||
      (loginUser.isAdmin &&
        loginUser.email === userToUpdate.email &&
        !bcrypt.compareSync(userToUpdate.password, userToUpdateFromDB.password))
    )
      return handleError(res, 403, `Incorrect current password`);

    // If admin, copy the password of the edit user from the DB. (admin is not allowed to change users' passwords)
    if (loginUser.isAdmin) {
      userToUpdate.password = userToUpdateFromDB.password;
    }

    // Create an object with only the fields present in userToUpdate. These fields are directly copied from the userToUpdate object
    const updatedFields = {
      first: userToUpdate.first,
      last: userToUpdate.last,
      phone: userToUpdate.phone,
      email: userToUpdate.email,
      city: userToUpdate.city,
      street: userToUpdate.street,
      houseNumber: userToUpdate.houseNumber,
      isAdmin: userToUpdate.isAdmin,
      // 1. admin => copy the old password
      // 2. not admin => if new password entered, then encrypt and update
      // 3. not admin => if not new password entered, keep the current password
      password: loginUser.isAdmin
        ? userToUpdate.newPassword === ""
          ? userToUpdateFromDB.password
          : bcrypt.hashSync(userToUpdate.newPassword, 10)
        : bcrypt.hashSync(
            // Decodes the user's password
            userToUpdate.newPassword !== "" // checks if userToUpdate.newPassword is not an empty strin
              ? userToUpdate.newPassword // if true - will use the newPassword
              : userToUpdate.password, // if false - will use the password
            10
          ),
    };

    // _id - The key by which we will search for the user
    // updatedFields - This containing the fields and their updated values for update
    // new: true - returns the updated document
    const updatedUser = await User.findOneAndUpdate(
      { email: userToUpdate.email },
      updatedFields,
      {
        new: true,
      }
    );

    if (!updatedUser) throw new Error("User update failed !");

    res.status(201).send(updatedUser);
  } catch (error) {
    return handleError(res, 404, `Mongoose Error: ${error.message}`);
  }
};

const getUserById = async (req, res) => {
  try {
    const { userId } = req.params;
    const { _id } = req.user;

    if (_id !== userId) return handleError(res, 403, "UnAuthorized Access");

    const userFromDB = await User.findById(userId).select(
      "-__v -_id -createdAt -isGoogleSignup -isBlocked -isAdmin -loginFailedCounter -blockedTime -cart -purchaseHistory"
    );

    if (!userFromDB)
      throw new Error("Could not find this user in the database");

    userFromDB.password = "";
    return res.status(200).json(userFromDB);
  } catch (error) {
    return handleError(res, 404, `Mongoose Error: ${error.message}`);
  }
};

const getUsers = async (req, res) => {
  try {
    const user = req.user;

    if (!user.isAdmin)
      return handleError(
        res,
        403,
        "Authorization Error: You must be an admin user to see all users in the database"
      );

    const usersFromDB = await User.find();
    return res.send(usersFromDB);
  } catch (error) {
    return handleError(res, 404, `Mongoose Error: ${error.message}`);
  }
};

const createResetPasswordKey = async (req, res) => {
  try {
    const { userEmail } = req.params;

    // Check if this user exist in the DB
    const existingUser = await User.findOne({ email: userEmail });
    if (!existingUser) {
      return handleError(res, 404, `User not found`);
    }

    const uniqueRandomKey = await generateUniqueRandomKey();
    existingUser.forgotPasswordKey = uniqueRandomKey;
    existingUser.forgotPasswordKeyCreatedTime = new Date();

    // _id - The key by which we will search for the user
    // updatedFields - This containing the fields and their updated values for update
    // new: true - returns the updated document
    const updatedUser = await User.findOneAndUpdate(
      existingUser._id,
      existingUser,
      {
        new: true,
      }
    );

    if (!updatedUser) throw new Error("User update failed !");

    res.status(201).send(updatedUser);
  } catch (error) {
    return handleError(res, 404, `Mongoose Error: ${error.message}`);
  }
};

const getUserByForgotPasswordKey = async (req, res) => {
  try {
    const { forgotPasswordKey } = req.params;

    const userFromDB = await User.findOne({
      forgotPasswordKey: forgotPasswordKey,
    });

    if (!userFromDB)
      throw new Error("Could not find this user in the database");

    return res.status(200).json(userFromDB);
  } catch (error) {
    return handleError(res, 404, `Mongoose Error: ${error.message}`);
  }
};

const updatePassword = async (req, res) => {
  try {
    const { forgotPasswordKey, newPassword } = req.body;

    const userFromDB = await User.findOne({
      forgotPasswordKey: forgotPasswordKey,
    });

    if (!userFromDB)
      throw new Error("Could not find this user in the database");

    const oneHourBefore = new Date(new Date().getTime() - 1 * 60 * 60 * 1000); // Current time -1 hour
    if (userFromDB.forgotPasswordKeyCreatedTime < oneHourBefore) {
      throw new Error("Link expired!");
    }

    // encrypt user password
    userFromDB.password = bcrypt.hashSync(newPassword, 10);
    userFromDB.forgotPasswordKey = "";

    const updatedUser = await User.findOneAndUpdate(
      { forgotPasswordKey: forgotPasswordKey },
      userFromDB,
      {
        new: true,
      }
    );

    return res.status(200).json(userFromDB);
  } catch (error) {
    return handleError(res, 404, `Mongoose Error: ${error.message}`);
  }
};

const createNewUser = async (req, res) => {
  try {
    const user = req.user;
    const { email } = user;

    if (!user.isAdmin)
      return handleError(
        res,
        403,
        "Authorization Error: You must be an admin user to create a new user!"
      );

    const { error } = registerJoiValidationSchema.validate(user, {});

    if (error)
      return handleError(res, 400, `Joi Error: ${error.details[0].message}`);

    const isUserExistInDB = await User.findOne({ email });
    if (isUserExistInDB) throw new Error("User already registered");
    const newUser = new User(user); //  the user variable contains the data for the new user. If the user doesn't exist, it creates a new user according to Mongo's User model and saves it to the database.

    // encrypt user password
    newUser.password = bcrypt.hashSync(newUser.password, 10);

    const userFromDB = await newUser.save();
    const { _id, isAdmin, first, last } = userFromDB;
    const token = jwt.sign({ _id, isAdmin, first, last }, JWT_KEY);
    res.status(201).send(token);
  } catch (error) {
    return handleError(res, 404, `Mongoose Error: ${error.message}`);
  }
};

const deleteUser = async (req, res) => {
  try {
    const user = req.user;
    const { userEmail } = req.query;

    if (!user.isAdmin)
      throw new Error(
        "You must be an admin type user in order to delete a user!"
      );

    const deletedUser = await User.findOneAndDelete({ email: userEmail });

    if (!deletedUser)
      throw new Error("A user with this Id cannot be found in the database!");

    res.status(201).send(deletedUser);
  } catch (error) {
    return handleError(res, 404, `Mongoose Error: ${error.message}`);
  }
};

const getUserByEmail = async (req, res) => {
  try {
    const { userEmail } = req.params;
    const { _id } = req.user;

    const userFromDB = await User.findOne({ email: userEmail });

    if (!userFromDB)
      throw new Error("Could not find this user in the database");

    return res.status(200).json(userFromDB);
  } catch (error) {
    return handleError(res, 404, `Mongoose Error: ${error.message}`);
  }
};

exports.register = register;
exports.login = login;
exports.checkout = checkout;
exports.purchaseHistory = purchaseHistory;
exports.purchaseHistoryDetails = purchaseHistoryDetails;
exports.editUser = editUser;
exports.getUserById = getUserById;
exports.getUsers = getUsers;
exports.createResetPasswordKey = createResetPasswordKey;
exports.getUserByForgotPasswordKey = getUserByForgotPasswordKey;
exports.updatePassword = updatePassword;
exports.createNewUser = createNewUser;
exports.deleteUser = deleteUser;
exports.getUserByEmail = getUserByEmail;
