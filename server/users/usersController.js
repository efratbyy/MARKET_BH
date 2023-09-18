const registerJoiValidation = require("../models/joiValidation/registerValidation");
const { handleError } = require("../utils/handleErrors");
const User = require("../models/mongooseValidation/User");
const bcrypt = require("bcryptjs");
const config = require("config");
const jwt = require("jsonwebtoken");
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
    res.status(201).send(userFromDB);
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
      const { _id, isAdmin } = userInDB;
      const token = jwt.sign({ _id, isAdmin }, JWT_KEY);
      console.log(userInDB);
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
        const { _id, isAdmin } = userInDB;
        const token = generateAuthToken({ _id, isAdmin });
        res.send(token);
      } else {
        throw new Error("Authentication Error: User is still Blocked!");
      }
    }
  } catch (error) {
    const isAuthError = error.message.includes("Authentication Error");
    return handleError(
      res,
      isAuthError ? 403 : 500,
      `Mongoose Error: ${error.message}`
    );
  }
};

exports.register = register;
exports.login = login;
