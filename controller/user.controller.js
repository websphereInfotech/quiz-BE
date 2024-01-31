const User = require("../models/user.model");
const bcrypt = require("bcrypt");
const sequelize = require("../config/index");
const jwt = require("jsonwebtoken");
const Token = require("../models/token.model");
const { google } = require("googleapis");
const transporter = require("../config/email");
const { config } = require("dotenv");
const { Otp } = require("../models");
config();
// const { OAuth2 } = google.auth;
// const oAuth2Client = new OAuth2(
//   process.env.GOOGLE_CLIENT_ID,
//   process.env.GOOGLE_CLIENT_SECRET,
//   process.env.GOOGLE_CALLBACK_URL
// );
// const twilio = require('twilio');
// const Nexmo = require('nexmo');
// const speakeasy = require("speakeasy");

exports.login = async (req, res) => {
  try {
    // const { mobileNumber } = req.body;
    // console.log("mobileNo:", mobileNumber);

    // const existingUser = await User.findOne({
    //   where: { mobileNumber },
    // });

    // const secret = speakeasy.generateSecret({ length: 20 });

    //     const otp = speakeasy.totp({
    //       secret: secret.base32,
    //       encoding: "base32",
    //     });

    // if (existingUser) {

    //   const payload = {
    //     id: existingUser.id,
    //     mobileNumber: existingUser.mobileNumber,
    //     coins: existingUser.coins
    //   };

    //   const token = jwt.sign(payload, process.env.SECRET_KEY, {
    //     expiresIn: "20d",
    //   });

    //   return res.status(200).json({
    //     status: "Success",
    //     message: "User Found Successfully",
    //     data: existingUser,
    //     token: token
    //     // otp:otp
    //   });
    // }

    // const usernew = await User.create({
    //   mobileNumber
    //   // secret: secret.base32,
    // });

    // const payload = {
    //   id: usernew.id,
    //   mobileNumber: usernew.mobileNumber,
    //   coins: usernew.coins
    // };

    const { email } = req.body;

    const charset = "0123456789";
    let otp = "";

    for (let i = 0; i < 6; i++) {
      const randomIndex = Math.floor(Math.random() * charset.length);
      otp += charset[randomIndex];
    }

    const { MAILID } = process.env;

    const existingOTP = await Otp.findOne({
      where: {
        email
      }
    });
    if (existingOTP) {
      existingOTP.otp = otp;
      await existingOTP.save();
    } else {
      await Otp.create({
        email,
        otp,
      });
    }
    await transporter.sendMail({
      from: MAILID,
      to: email,
      subject: "OTP verification",
      text: `Your OTP is ${otp}`,
    });

    // const token = jwt.sign(payload, process.env.SECRET_KEY, {
    //   expiresIn: "20d",
    // });

    // console.log("Generated OTP:", otp);

    return res.status(200).json({
      status: "Success",
      message: "Mail Successfully sent",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      status: "Fail",
      message: "Internal Server Error",
    });
  }
};

// exports.login

exports.updateCoins = async (req, res) => {
  try {
    const { coins } = req.body;
    const userId = req.user.id;

    const user = await User.findByPk(userId);

    // const user = await User.update(
    //   { coins: sequelize.literal(`coins + ${coins}`) }, // Increment coins
    //   { where: { id: userId } }
    // );

    if (!user) {
      return res.json({
        status: "Fail",
        message: "User not found or update failed",
      });
    }

    await user.increment("coins", { by: coins });

    const updatedUser = await User.findByPk(userId);

    res.json({
      status: "Success",
      mobileNumber: updatedUser.mobileNumber,
      totalCoins: updatedUser.coins,
    });

    console.log("COINS AFTER:", updatedUser);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      status: "Fail",
      message: "Internal Server Error",
    });
  }
};

exports.verifyOTP = async (req, res) => {
  const { email, otp } = req.body;

  const getOTP = await Otp.findOne({
    where: {
      email,
      otp
    }
  });
  if (getOTP) {
    await getOTP.destroy();
    const getUser = await User.findOne({ where: {
      email
    }});
    if (getUser) {
      const payload = {
        id: getUser.id,
        mobileNumber: getUser.email,
        coins: getUser.coins,
      };
      const token = jwt.sign(payload, process.env.SECRET_KEY, {
        expiresIn: "20d",
      });

      return res.status(200).json({
        status: "Success",
        message: "User successfully login",
        data: getUser,
        token,
      });
    } else {
      const user = await User.create({
        email,
      });
      const payload = {
        id: user.id,
        mobileNumber: user.email,
        coins: user.coins,
      };
      const token = jwt.sign(payload, process.env.SECRET_KEY, {
        expiresIn: "20d",
      });

      return res.status(200).json({
        status: "Success",
        message: "User successfully login",
        data: user,
        token,
      });
    }
  }else{
    return res.status(400).json({
      status: "Success",
      message: "Incorrect OTP",
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
