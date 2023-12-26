const Joi = require("joi");

const registerJoiValidationSchema = Joi.object({
  // name: Joi.object()
  //   .keys({
  //     first: Joi.string().min(2).max(256).required(),
  //     last: Joi.string().min(2).max(256).required(),
  //   })
  first: Joi.string().min(2).max(256).required(),
  last: Joi.string().min(2).max(256).required(),
  phone: Joi.string()
    .ruleset.regex(/0[0-9]{1,2}\-?\s?[0-9]{7}/)
    .rule({ message: 'user "phone" mast be a valid phone number' })
    .required(),
  email: Joi.string()
    .ruleset.pattern(
      /^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/
    )
    .rule({ message: 'user "email" mast be a valid email' })
    .required(),
  password: Joi.string()
    .ruleset.regex(
      /((?=.*\d{1})(?=.*[A-Z]{1})(?=.*[a-z]{1})(?=.*[!@#$%^&*-]{1}).{8,20})/
    )
    .rule({
      message:
        'user "password" must be at least 8 characters long and contain an uppercase letter, a lowercase letter, at least 4 numbers and one of the following characters !@#$%^&*-',
    }) // /((?=.*\d{1})(?=.*[A-Z]{1})(?=.*[a-z]{1})(?=.*[!@#$%^&*-]{1}).{7,20})/
    .required(),
  city: Joi.string().required(),
  street: Joi.string().required(),
  houseNumber: Joi.number().min(1).required(),
  isAdmin: Joi.boolean(),
  // address: Joi.object()
  //   .keys({
  //     city: Joi.string().required(),
  //     street: Joi.string().required(),
  //     houseNumber: Joi.number().min(1).required(),
  //   })
  //   .required(),
  // isGoogleSignup: Joi.boolean().allow(""),
  // isBlocked: Joi.boolean().required(),
  // loginFailedCounter: Joi.number().required(),
  // blockedTime: Joi.date().required(),
});

module.exports = registerJoiValidationSchema;
