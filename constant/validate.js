const Joi = require("joi");

exports.mobileNo = function (req, res, next) {
  const { mobileNumber } = req.body;
  if (mobileNumber === null || mobileNumber === undefined || mobileNumber === "") {
    return res.status(400).json({
      status: "fail",
      message: "Mobile Number Cannot Be Empty",
    });
  }
  const mobileNumberSchema = Joi.string()
    .min(10)
    .max(10)
    .required()
    .messages({
      "string.base": "Mobile Number Must Be A Number",
      "string.min": "Mobile Number Must Have At Least 10 Digits",
      "string.max": "Mobile Number Cannot Have More Than 10 Digits",
      "any.required": "Required field: Mobile Number",
    });

  const { error: mobileNumberError } = mobileNumberSchema.validate(mobileNumber);

  if (mobileNumberError) {
    return res.status(400).json({
      status: "fail",
      message: mobileNumberError.message,
    });
  } else {
    next();
  }
};
// module.exports.validator = {
//   NAME: Joi.string()
//     .trim()
//     .min(1)
//     .max(50)
//     .required()
//     .pattern(new RegExp("^[a-zA-Z]+$"))
//     .messages({
//       "string.pattern.base": "name must only contain characters",
//     }),

//   MOBILENUMBER: Joi.number().required().messages({
//     max: "mobile number must only ",
//   }),

//   EMAIL: Joi.string().trim().email().required().messages({
//     "string.email": "email is not allowed",
//   }),

//   PASSWORD: Joi.string().trim().min(4).required().messages({
//     "string.min": "Password must be at least 4 characters long",
//   }),

//   CONFIRM_PASSWORD: Joi.string().trim().min(4).required().messages({
//     "string.min": "Password must be at least 4 characters long",
//   }),

//   //   ROLE: Joi.string()
//   //     .trim()
//   //     .valid("Seller")
//   //     .required()
//   //     .messages({
//   //       "any.only": "Invalid role",
//   //     }),
// };