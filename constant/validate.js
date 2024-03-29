const Joi = require("joi");

// exports.mobileNo = function (req, res, next) {
//   const { mobileNumber } = req.body;
//   if (mobileNumber === null || mobileNumber === undefined || mobileNumber === "") {
//     return res.status(400).json({
//       status: "fail",
//       message: "Mobile Number Cannot Be Empty",
//     });
//   }
//   const mobileNumberSchema = Joi.string()
//     .min(10)
//     .max(10)
//     .required()
//     .messages({
//       "string.base": "Mobile Number Must Be A Number",
//       "string.min": "Mobile Number Must Have At Least 10 Digits",
//       "string.max": "Mobile Number Cannot Have More Than 10 Digits",
//       "any.required": "Required field: Mobile Number",
//     });

//   const { error: mobileNumberError } = mobileNumberSchema.validate(mobileNumber);

//   if (mobileNumberError) {
//     return res.status(400).json({
//       status: "fail",
//       message: mobileNumberError.message,
//     });
//   } else {
//     next();
//   }
// };
exports.email = function (req, res, next) {
  const { email } = req.body;
  if (email === null || email === undefined || email === "") {
    return res.status(400).json({
      status: "fail",
      message: "email Cannot Be Empty",
    });
  }
  const emailSchema = Joi.string()
    .email({ minDomainSegments: 2, tlds: { allow: ["com", "net", "in"] } })
    .required()
    .messages({
      "string.base": "Email Must Be A String",
      "string.email": "Invalid Email Format",
      "any.required": "Required field: Email",
    });

  const { error: emailError } = emailSchema.validate(email);

  if (emailError) {
    return res.status(400).json({
      status: "fail",
      message: emailError.message,
    });
  } else {
    next();
  }
};

exports.emailAndOtp = function (req, res, next) {
  const { email, otp } = req.body;

  // Validate email
  if (email === null || email === undefined || email === "") {
    return res.status(400).json({
      status: "fail",
      message: "Email Cannot Be Empty",
    });
  }

  const emailSchema = Joi.string()
    .email({ minDomainSegments: 2, tlds: { allow: ["com", "net", "in"] } })
    .required()
    .messages({
      "string.base": "Email Must Be A String",
      "string.email": "Invalid Email Format",
      "any.required": "Required field: Email",
    });

  const { error: emailError } = emailSchema.validate(email);

  if (emailError) {
    return res.status(400).json({
      status: "fail",
      message: emailError.message,
    });
  }

  // Validate OTP
  if (
    otp === null ||
    otp === undefined ||
    otp.toString().length !== 6 ||
    isNaN(otp)
  ) {
    return res.status(400).json({
      status: "fail",
      message: "Invalid OTP. OTP must be a 6-digit number.",
    });
  }

  // Continue if both email and OTP are valid
  next();
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