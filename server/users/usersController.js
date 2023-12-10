const registerJoiValidation = require("../models/joiValidation/registerValidation");
const { handleError } = require("../utils/handleErrors");
const User = require("../models/mongooseValidation/User");
const bcrypt = require("bcryptjs");
const config = require("config");
const jwt = require("jsonwebtoken");
const Purchase = require("../models/mongooseValidation/Purchase");
const generateOrderNumber = require("../helpers/generateOrderNumber");
const JWT_KEY = config.get("JWT_KEY");

const register = async (req, res) => {
  try {
    const user = req.body;
    const { email } = user;
    const { error } = registerJoiValidation(user);

    if (error)
      return handleError(res, 400, `Joi Error: ${error.details[0].message}`);
    const isUserExistInDB = await User.findOne({ email });
    if (isUserExistInDB) throw new Error("User already registered");
    const newUser = new User(user);

    // encrypt user password
    newUser.password = bcrypt.hashSync(newUser.password, 10);

    const userFromDB = await newUser.save();
    const { _id, isAdmin, first, last } = userFromDB;
    const token = jwt.sign({ _id, isAdmin, email, first, last }, JWT_KEY);
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
      const token = jwt.sign({ _id, isAdmin, email, first, last }, JWT_KEY);
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
        const token = jwt.sign({ _id, isAdmin, email, first, last }, JWT_KEY);
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

// Move cart to parches history
const checkout = async (req, res) => {
  try {
    const user = req.user;
    const { userId } = req.params;
    if (user._id !== userId) throw new Error("Illegal action");
    const userFromDB = await User.findById(userId);
    if (!userFromDB) throw new Error("User not registered");

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
    const { error } = registerJoiValidation(userToUpdate, {
      stripUnknown: true,
      allowUnknown: true,
    });

    if (error)
      return handleError(res, 400, `Joi Error: ${error.details[0].message}`);

    const existingUser = await User.findById(_id);
    if (!existingUser) {
      return handleError(res, 404, `User not found`);
    }
    console.log("a");
    const existingUserEmail =
      existingUser.email != userToUpdate.email &&
      (await User.findOne({ email: userToUpdate.email }));
    if (existingUserEmail) {
      return handleError(res, 404, `Email address already exist`);
    }
    // Create an object with only the fields present in userToUpdate
    const updatedFields = {
      first: userToUpdate.first,
      last: userToUpdate.last,
      phone: userToUpdate.phone,
      email: userToUpdate.email,
      city: userToUpdate.city,
      street: userToUpdate.street,
      houseNumber: userToUpdate.houseNumber,
      password: bcrypt.hashSync(
        userToUpdate.newPassword !== ""
          ? userToUpdate.newPassword
          : userToUpdate.password,
        10
      ),
    };

    const updatedUser = await User.findByIdAndUpdate(_id, updatedFields, {
      new: true,
    });

    if (!updatedUser) throw new Error("User update failed !");

    res.status(201).send(updatedUser);
  } catch (error) {
    return handleError(res, 404, `Mongoose Error: ${error.message}`);
  }
};

const getUserById = async (req, res) => {
  try {
    const { userId } = req.params;
    const { _id, isAdmin } = req.user;

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
    console.log(user);
    if (!user.isAdmin)
      return handleError(
        res,
        403,
        "Authorization Error: You must be an admin user to see all users in the database"
      );

    const usersFromDB = await User.find();
    console.log(usersFromDB);
    return res.send(usersFromDB);
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
