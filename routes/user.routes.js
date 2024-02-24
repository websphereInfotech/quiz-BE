const express = require("express");
const { login,updateCoins,verifyOTP, test,signupWithGoogle } = require("../controller/user.controller");

// const { validationConstant } = require("../constant/validate.constant");
const { IsVerify } = require("../middlware/auth");
// const passport = require('passport');

const userRoutes = express.Router();
const {validation}=require('../constant/validate.constant')

userRoutes.post("/login",validation('login'), login);
userRoutes.post("/signup/google", signupWithGoogle);
userRoutes.post('/otp_verify',validation('otpVerify'), verifyOTP)
userRoutes.post('/updateCoins',IsVerify, updateCoins);


module.exports = userRoutes;