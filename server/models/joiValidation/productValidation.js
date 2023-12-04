const Joi = require("joi");

const productJoiValidation = (product) => {
  const schema = Joi.object({
    title: Joi.string().min(2).max(256).required(),
    brand: Joi.string().min(2).max(256).required(),
    barcode: Joi.string().min(2).max(256).required(),
    categoryCode: Joi.string().min(1).max(256).required(),
    price: Joi.number().min(2).max(256).required(),
    image: {
      url: Joi.string().min(2).max(256),
      alt: Joi.string().min(2).max(256),
    },
    details: {
      ingredients: Joi.string().min(2).max(256),
      weightTopDisplay: Joi.number().min(1).max(256).required(),
      weightUnitTopDisplay: Joi.string().min(2).max(256).required(),
      weight: Joi.number(),
      weightUnit: Joi.string().min(2).max(256).required(),
      divideBy: Joi.number().min(1).max(256).required(),
      isSodium: Joi.boolean(),
      isSugar: Joi.boolean(),
      isSaturatedFat: Joi.boolean(),
      isGreenMark: Joi.boolean(),
      isSupervised: Joi.boolean(),
      content: Joi.string().min(2).max(256),
      manufacturingCountry: Joi.string().min(2).max(256),
    },
  });
  return schema.validate(product);
};

module.exports = productJoiValidation;
