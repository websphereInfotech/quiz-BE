const User = require("./user.model");
const Questions = require("./questions.model");
const Token = require("./token.model");
const Otp = require("./otp.model");
const Category = require("./category.model");
const SubCategory = require("./subcategory.model");
const loginQuestion = require("./loginquestions.model")
module.exports = {
  User,
  Questions,
  Token,
  Otp,
  Category,
  SubCategory,
  loginQuestion
};
