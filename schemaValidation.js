const Joi = require("joi");

module.exports.schemaValidation = Joi.object({
  title: Joi.string().required().min(3).max(30),
  description: Joi.string().required().min(10),
  image: Joi.string().allow("", null),
  price: Joi.number().min(0).required(),
  location: Joi.string().required(),
  country: Joi.string().required(),
});

module.exports.reviewValidation = Joi.object({
  rating: Joi.number().min(0).max(5).required(),
  comment: Joi.string().required(),
});
