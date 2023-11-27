const User = require("../models/user.model");
// const User = require('../models/index')
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
const speakeasy = require('speakeasy');


// signup
// exports.signup = async (req, res) => {
//   try {
//     const { name, email, password, mobileNumber } = req.body;
//     const existingUser = await User.findAll({
//       where: {
//         email: email,
//       },
//     });
//     if (existingUser.length > 0) {
//       return res.status(404).json({
//         status: "Fail",
//         message: "User Already Exist",
//       });
//     }

//     const salt = await bcrypt.genSalt(10);
//     const hashPassword = await bcrypt.hash(password, salt);

//     const user = await User.create({
//       name: name,
//       email: email,
//       password: hashPassword,
//       mobileNumber: mobileNumber,
//       coins: 100
//     });

//     const payload = {
//       id: user.id,
//       name: user.name,
//       email: user.email,
//       password: user.hashPassword,
//       mobileNumber: user.mobileNumber,
//       coins: user.coins
//     };

//     const token = jwt.sign(payload, process.env.SECRET_KEY, {
//       expiresIn: "20d",
//     });

//     const newToken = await Token.create({
//       token: token,
//       isActive: true,
//       UserId: user.id,
//     });

//     // const updateCoins = await User.update(
//     //   { coins: user.coins + 100 }, 
//     //   { where: { id: user.id } }
//     // );

//     user.updateCoins = user

//     return res.status(201).json({
//       status: "Success",
//       message: "user create Successfully",
//       data: user,
//       token: token,
//     });
//   } catch (error) {
//     console.log(error);
//     return res
//       .status(500)
//       .json({ status: "Fail", error: "Internal Server Error" });
//   }
// };

// const accountSid = 'ACcfaf9f7cb1d2ba0cac0a76c93c09c195';
// const authToken = '46ef0754198bfe7cf19611fed6984d10';
// const client = require('twilio')(accountSid, authToken);

// // logIn
// exports.login = async (req, res) => {
//   try {
//     const { mobileNumber} = req.body;

//     const otp = Math.floor(100000 + Math.random() * 900000);

//     const message = await client.messages.create({
//       body: `Your OTP is: ${otp}`,
//       from: '+12253618500',
//       to: `+91${mobileNumber}`,
//     });

//     if (message.errorCode) {
//       return res.status(400).json({
//         status: 'Fail',
//         message: `Error sending OTP: ${message.errorMessage}`,
//       });
//     }

//     const existingUser = await User.findOne({
//       where: { mobileNumber },
//     });

//     if (existingUser) {
//       return res.status(409).json({
//         status: 'Fail',
//         message: 'User with this mobile number already exists.',
//       });
//     }

//     const checkUser = await User.create({
//       mobileNumber,
//     });

//     console.log(">>>>>>",mobileNumber);

//     const payload = {
//       id: checkUser.id,
//       mobileNumber: checkUser.mobileNumber,
//     };

//     const token = jwt.sign(payload, process.env.SECRET_KEY, {
//       expiresIn: "20d",
//     });

//     res.status(201).json({
//       status: "success",
//       message: "Login Successful",
//       data: checkUser,
//       token:token
//     });
//   } 
//   catch (error) {
//     console.log(error);
//     res.status(500).json({
//       status: "Fail",
//       message: "Internal Server Error",
//     });
//   }
// };



// const nexmo = new Nexmo({
//   apiKey: '35a7d5ad',
//   apiSecret: '7OaKhP8ZLfoyvt5s',
// });

// exports.login = async (req, res) => {
//   try {
//     const { mobileNumber } = req.body;

//     // Generate a random 4-digit OTP
//     const otp = Math.floor(1000 + Math.random() * 9000);

//     // Send OTP via Nexmo
//     nexmo.message.sendSms(
//       'YOUR_NEXMO_VIRTUAL_NUMBER',  // Use the Nexmo virtual number
//       mobileNumber,
//       `Your OTP for login is: ${otp}`,
//       { type: 'unicode' },
//       async (err, responseData) => {
//         if (err) {
//           return res.status(500).json({
//             status: 'Fail',
//             message: `Error sending OTP: ${err.message}`,
//           });
//         }
//         console.log('OTP Sent:', responseData);

//         // Check if the message was sent successfully
//         if (responseData.messages[0].status !== '0') {
//           return res.status(500).json({
//             status: 'Fail',
//             message: `Failed to send OTP. Nexmo error: ${responseData.messages[0]['error-text']}`,
//           });
//         }

//         // Check if the user already exists
//         const existingUser = await User.findOne({
//           where: { mobileNumber },
//         });

//         if (existingUser) {
//           return res.status(409).json({
//             status: 'Fail',
//             message: 'User with this mobile number already exists.',
//           });
//         }

//         // Create a new user or update the existing one with the mobile number
//         const user = existingUser || await User.create({
//           mobileNumber,
//         });

//         const payload = {
//           id: user.id,
//           mobileNumber: user.mobileNumber,
//         };

//         const token = jwt.sign(payload, process.env.SECRET_KEY, {
//           expiresIn: '20d',
//         });

//         res.status(201).json({
//           status: 'success',
//           message: 'Login Successful',
//           data: user,
//           token: token,
//         });
//       }
//     );
//   } catch (error) {
//     console.log(error);
//     res.status(500).json({
//       status: 'Fail',
//       message: 'Internal Server Error',
//     });
//   }
// };

exports.login = async (req, res) => {
  try {
    const { mobileNumber } = req.body;
    console.log("mobileNo:", mobileNumber);

    const existingUser = await User.findOne({
                where: { mobileNumber },
              });
      
              if (existingUser) {
                return res.status(409).json({
                  status: 'Fail',
                  message: 'User with this mobile number already exists.',
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
      expiresIn: '20d',
    });

    const otp = speakeasy.totp({
      secret: secret.base32,
      encoding: 'base32',
    });

    console.log('Generated OTP:', otp);

    return res.status(200).json({
      status: 'Success',
      message: 'OTP generated and sent successfully',
      data: usernew,
      otp: otp,
      token: token
    });
  }
  catch (error) {
    console.log(error);
    res.status(500).json({
      status: 'Fail',
      message: 'Internal Server Error',
    });
  }
};

// userInfo
// exports.userInfo = async (req, res) => {
//   try {
//     const checkUser = await User.find(req.user.id, {
//       attributes: { exclude: ["password"] },
//     });

//     if (!checkUser) {
//       return res.status(404).json({
//         status: "Fail",
//         message: "User not found",
//       });
//     }

//     return res.status(200).json({
//       status: "Success",
//       message: "User fetched successfully",
//       data: checkUser,
//     });
//   } catch (error) {
//     console.log(error);
//     return res
//       .status(500)
//       .json({ status: "Fail", error: "Internal Server Error" });
//   }
// };

// logout
// exports.logout = async (req, res) => {
//   try {
//     const userId = req.user.id; // Extract user ID from the verified token

//     // Set the isActive status of the user's token to false
//     const updatedToken = await Token.update(
//       { isActive: false },
//       { where: { UserId: userId } }
//     );

//     if (updatedToken[0] === 0) {
//       return res.status(404).json({
//         status: "Fail",
//         message: "Token not found",
//       });
//     }

//     return res.status(200).json({
//       status: "Success",
//       message: "Logout successful",
//     });
//   } catch (error) {
//     console.log(error);
//     return res
//       .status(500)
//       .json({ status: "Fail", error: "Internal Server Error" });
//   }
// };

// exports.updateUser = async (req, res) => {
//   try {
//     const userId = req.user.id;
//     const { name, email, password, mobileNumber } = req.body;
//     const existingUser = await User.findByPk(userId);

//     if (existingUser.length > 0) {
//       return res.status(404).json({
//         status: "Fail",
//         message: "User not Found",
//       });
//     }

//     // Update user information
//     existingUser.name = name || existingUser.name;
//     existingUser.email = email || existingUser.email;

//     if (password) {
//       const salt = await bcrypt.genSalt(10);
//       const hashPassword = await bcrypt.hash(password, salt);
//       existingUser.password = hashPassword;
//     }

//     existingUser.mobileNumber = mobileNumber || existingUser.mobileNumber;

//     // Save the updated user information
//     await existingUser.save();

//     // You might want to generate a new token here if any critical information is updated

//     return res.status(200).json({
//       status: "Success",
//       message: "User information updated successfully",
//       data: existingUser,
//     });
//   } catch (error) {
//     console.log(error);
//     return res
//       .status(500)
//       .json({ status: "Fail", error: "Internal Server Error" });
//   }
// };

// exports.signupWithGoogle = async (req, res) => {
//   try {
//     const { idToken } = req.body;

//     const ticket = await oAuth2Client.verifyIdToken({
//       idToken,
//       audience: process.env.GOOGLE_CLIENT_ID,
//     });
//     console.log(ticket);
//     const { name, email } = ticket.getPayload();

//     const existingUser = await User.findOne({
//       where: {
//         email: email,
//       },
//     });

//     if (existingUser) {
//       return res.status(400).json({
//         status: "Fail",
//         message: "User Already Exists",
//       });
//     }

//     const user = await User.create({
//       name: name,
//       email: email,
//       // You might want to generate a random password for the user or handle it differently
//       password: "generatedPassword",
//     });

//     const payload = {
//       id: user.id,
//       name: user.name,
//       email: user.email,
//       password: user.password,
//       mobileNumber: user.mobileNumber,
//     };

//     const token = jwt.sign(payload, process.env.SECRET_KEY, {
//       expiresIn: "20d",
//     });

//     const newToken = await Token.create({
//       token: token,
//       isActive: true,
//       UserId: user.id,
//     });

//     return res.status(201).json({
//       status: "Success",
//       message: "User created successfully with Google",
//       data: user,
//       token: token,
//     });
//   } catch (error) {
//     console.error(error);
//     return res.status(500).json({
//       status: "Fail",
//       error: "Internal Server Error",
//     });
//   }
// };