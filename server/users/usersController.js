const registerJoiValidation = require("../models/usersModels/joiValidation/registerValidation");
const { handleError } = require("../utils/handleErrors");
const User = require("../models/usersModels/mongooseValidation/User");

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
    const userFromDB = await newUser.save(); // ?userToDB לא צריך לקרוא לו
    res.status(201).send(userFromDB);
  } catch (error) {
    return handleError(res, 404, `Mongoose Error: ${error.message}`);
  }
};

exports.register = register;
