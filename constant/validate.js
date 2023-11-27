const Joi = require("joi");

module.exports.validator = {
  NAME: Joi.string()
    .trim()
    .min(1)
    .max(50)
    .required()
    .pattern(new RegExp("^[a-zA-Z]+$"))
    .messages({
      "string.pattern.base": "name must only contain characters",
    }),

  MOBILENUMBER: Joi.number().required().messages({
    max: "mobile number must only ",
  }),

  EMAIL: Joi.string().trim().email().required().messages({
    "string.email": "email is not allowed",
  }),

  PASSWORD: Joi.string().trim().min(4).required().messages({
    "string.min": "Password must be at least 4 characters long",
  }),

  CONFIRM_PASSWORD: Joi.string().trim().min(4).required().messages({
    "string.min": "Password must be at least 4 characters long",
  }),

  //   ROLE: Joi.string()
  //     .trim()
  //     .valid("Seller")
  //     .required()
  //     .messages({
  //       "any.only": "Invalid role",
  //     }),
};
