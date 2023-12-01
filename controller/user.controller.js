const User = require("../models/user.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Token = require("../models/token.model");
const { google } = require("googleapis");
// const { OAuth2 } = google.auth;
// const oAuth2Client = new OAuth2(
//   process.env.GOOGLE_CLIENT_ID,
//   process.env.GOOGLE_CLIENT_SECRET,
//   process.env.GOOGLE_CALLBACK_URL
// );
// const twilio = require('twilio');
// const Nexmo = require('nexmo');
const speakeasy = require("speakeasy");

exports.login = async (req, res) => {
  try {
    const { mobileNumber } = req.body;
    console.log("mobileNo:", mobileNumber);

    const existingUser = await User.findOne({
      where: { mobileNumber },
    });

    if (existingUser) {
      return res.status(409).json({
        status: "Fail",
        message: "User with this mobile number already exists.",
      });
    }

    const secret = speakeasy.generateSecret({ length: 20 });

    const usernew = await User.create({
      mobileNumber,
      secret: secret.base32,
    });

    console.log(">>>>>>>>>>", usernew);

    const payload = {
      id: usernew.id,
      mobileNumber: usernew.mobileNumber,
    };

    const token = jwt.sign(payload, process.env.SECRET_KEY, {
      expiresIn: "20d",
    });

    const otp = speakeasy.totp({
      secret: secret.base32,
      encoding: "base32",
    });

    console.log("Generated OTP:", otp);

    return res.status(200).json({
      status: "Success",
      message: "OTP generated and sent successfully",
      data: usernew,
      otp: otp,
      token: token,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      status: "Fail",
      message: "Internal Server Error",
    });
  }
};

exports.updateCoins = async (req, res) => {
  try {
    const { mobileNumber, coins} = req.body;
    const user = await User.findOne({ where: { mobileNumber } });
    if (!user) {
      return res.status(404).json({
        status: 'Fail',
        message: 'User not found',
      });
    }
    console.log("COINS BEFORE:", coins);
    if (coins >= 0) {
      // Positive score, add the coins
      user.coins += coins;
    }
    console.log("USERCOINS",user.coins);
    // Save the changes to the database
    await user.save();
    res.json({
      status: 'Success',
      mobileNumber:user.mobileNumber,
      totalCoins: user.coins,
    });
    // console.log("COINS",data.totalCoins);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      status: 'Fail',
      message: 'Internal Server Error',
    });
  }
};