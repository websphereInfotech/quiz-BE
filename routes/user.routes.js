const express = require("express");
const { login } = require("../controller/user.controller");
// const { validationConstant } = require("../constant/validate.constant");
// const { IsVerify } = require("../middlware/auth");
// const passport = require('passport');
const userRoutes = express.Router();
const {validation}=require('../constant/validate.constant')

// signup user
// userRoutes.post("/signup", validationConstant('register'),signup);

// login user
userRoutes.post("/login",validation('login'), login);

// view user
// userRoutes.get("/view", IsVerify, userInfo);

// logout api
// userRoutes.get("/logout", IsVerify, logout);

// update user
// userRoutes.put("/update", IsVerify, updateUser);

// google auth
// userRoutes.get(
//   "/auth/google",
//   passport.authenticate("google", { scope: ["profile"] })
// );
// userRoutes.post("/signup/google", signupWithGoogle);

module.exports = userRoutes;