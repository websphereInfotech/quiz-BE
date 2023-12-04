const User = require("../models/user.model");
const bcrypt = require("bcrypt");
const sequelize = require("../config/index");
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

      const payload = {
        id: existingUser.id,
        mobileNumber: existingUser.mobileNumber,
        otp:existingUser.otp,
        coins: existingUser.coins
      };
  
      const token = jwt.sign(payload, process.env.SECRET_KEY, {
        expiresIn: "20d",
      });

      return res.status(200).json({
        status: "Success",
        message: "User Found Successfully",
        data: existingUser,
        token: token,
      });
    }

    const secret = speakeasy.generateSecret({ length: 20 });

    const usernew = await User.create({
      mobileNumber,
      secret: secret.base32,
    });

    const payload = {
      id: usernew.id,
      mobileNumber: usernew.mobileNumber,
      coins: usernew.coins
    };

    const token = jwt.sign(payload, process.env.SECRET_KEY, {
      expiresIn: "20d",
    });

    console.log(">>>>>>>>>>", token);

    const otp = speakeasy.totp({
      secret: secret.base32,
      encoding: "base32",
    });

    console.log("Generated OTP:", otp);

    return res.status(200).json({
      status: "Success",
      message: "OTP Generated and Sent Successfully",
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
    const { coins } = req.body;
    const userId = req.user.id;

    // Update the coins based on your business logic
    const user = await User.update(
      { coins: sequelize.literal(`coins + ${coins}`) }, // Increment coins
      { where: { id: userId } }
    );

    if (!user) {
      return res.json({
        status: 'Fail',
        message: 'User not found or update failed',
      });
    }

    const updatedUser = await User.findByPk(userId);

    res.json({
      status: 'Success',
      mobileNumber: updatedUser.mobileNumber,
      totalCoins: updatedUser.coins,
    });

    console.log('COINS AFTER:', updatedUser.coins);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      status: 'Fail',
      message: 'Internal Server Error',
    });
  }
};
// exports.updateCoins = async (req, res) => {
//   try {
//     const { coins} = req.body;
//     console.log(">>>>>>>>>>>>", req.user.id);
//     console.log("COINS BEFORE:", coins);

//     const user = await User.findOne({
//       where: req.user.id
//     })
//     if(!user){
//      return res.json({
//           status: 'Fail',
//           message: "user not found"
//         });
//     }
//     console.log(user);


//     if (coins >= 0) {
//       user.coins += coins;
//     }
//     console.log("USERCOINS",user.coins);
//     // await user.save();
//     res.json({
//       status: 'Success',
//       mobileNumber:user.mobileNumber,
//       totalCoins: user.coins,
//     });
//     // console.log("COINS",totalCoins);
    
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({
//       status: 'Fail',
//       message: 'Internal Server Error',
//     });
//   }
// };