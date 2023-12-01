const express = require("express");
const { login,updateCoins } = require("../controller/user.controller");

// const { validationConstant } = require("../constant/validate.constant");
// const { IsVerify } = require("../middlware/auth");
// const passport = require('passport');

const userRoutes = express.Router();
const {validation}=require('../constant/validate.constant')

userRoutes.post("/login",validation('login'), login);
userRoutes.post('/updateCoins', updateCoins);


module.exports = userRoutes;