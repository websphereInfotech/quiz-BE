const User = require("../models/user.model");
// const User = require('../models/index')
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Token = require("../models/token.model");
const { google } = require("googleapis");
const { OAuth2 } = google.auth;
const oAuth2Client = new OAuth2(
  process.env.GOOGLE_CLIENT_ID,
  process.env.GOOGLE_CLIENT_SECRET,
  process.env.GOOGLE_CALLBACK_URL
);

// signup
exports.signup = async (req, res) => {
  try {
    const { name, email, password, mobileNumber } = req.body;
    const existingUser = await User.findAll({
      where: {
        email: email,
      },
    });
    if (existingUser.length > 0) {
      return res.status(404).json({
        status: "Fail",
        message: "User Already Exist",
      });
    }

    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, salt);

    const user = await User.create({
      name: name,
      email: email,
      password: hashPassword,
      mobileNumber: mobileNumber,
      coins: 100
    });

    const payload = {
      id: user.id,
      name: user.name,
      email: user.email,
      password: user.hashPassword,
      mobileNumber: user.mobileNumber,
      coins: user.coins
    };

    const token = jwt.sign(payload, process.env.SECRET_KEY, {
      expiresIn: "20d",
    });

    const newToken = await Token.create({
      token: token,
      isActive: true,
      UserId: user.id,
    });

    // const updateCoins = await User.update(
    //   { coins: user.coins + 100 }, 
    //   { where: { id: user.id } }
    // );

    user.updateCoins = user

    return res.status(201).json({
      status: "Success",
      message: "user create Successfully",
      data: user,
      token: token,
    });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ status: "Fail", error: "Internal Server Error" });
  }
};

// logIn
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find the seller by email
    const checkUser = await User.findOne({
      where: {
        email: email,
      },
    });

    if (!checkUser) {
      return res.status(404).json({
        status: "Fail",
        message: "Required For SignUp",
      });
    }

    // Compare the provided password with the hashed password in the database
    const isMatch = await bcrypt.compare(password, checkUser.password);

    if (!isMatch) {
      return res.status(404).json({
        status: "Fail",
        message: "User password is incorrect",
      });
    }

    // Deactivate existing active tokens for the seller
    await Token.update(
      { isActive: false },
      {
        where: {
          UserId: checkUser.id,
          isActive: true,
        },
      }
    );

    // Generate a new JWT token
    const payload = {
      id: checkUser.id,
      name: checkUser.name,
      email: checkUser.email,
      password: checkUser.hashPassword,
      mobileNumber: checkUser.mobileNumber,
    };

    const token = jwt.sign(payload, process.env.SECRET_KEY, {
      expiresIn: "20d",
    });

    // Save the new token in the database
    const newToken = await Token.create({
      UserId: checkUser.id,
      token,
      isActive: true,
    });

    res.status(201).json({
      status: "success",
      message: "Seller Is Login",
      data: newToken,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      status: "Fail",
      message: "Internal Server Error",
    });
  }
};

// userInfo
exports.userInfo = async (req, res) => {
  try {
    const checkUser = await User.findByPk(req.user.id, {
      attributes: { exclude: ["password"] },
    });

    if (!checkUser) {
      return res.status(404).json({
        status: "Fail",
        message: "User not found",
      });
    }

    return res.status(200).json({
      status: "Success",
      message: "User fetched successfully",
      data: checkUser,
    });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ status: "Fail", error: "Internal Server Error" });
  }
};

// logout
exports.logout = async (req, res) => {
  try {
    const userId = req.user.id; // Extract user ID from the verified token

    // Set the isActive status of the user's token to false
    const updatedToken = await Token.update(
      { isActive: false },
      { where: { UserId: userId } }
    );

    if (updatedToken[0] === 0) {
      return res.status(404).json({
        status: "Fail",
        message: "Token not found",
      });
    }

    return res.status(200).json({
      status: "Success",
      message: "Logout successful",
    });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ status: "Fail", error: "Internal Server Error" });
  }
};

exports.updateUser = async (req, res) => {
  try {
    const userId = req.user.id;
    const { name, email, password, mobileNumber } = req.body;
    const existingUser = await User.findByPk(userId);

    if (existingUser.length > 0) {
      return res.status(404).json({
        status: "Fail",
        message: "User not Found",
      });
    }

    // Update user information
    existingUser.name = name || existingUser.name;
    existingUser.email = email || existingUser.email;

    if (password) {
      const salt = await bcrypt.genSalt(10);
      const hashPassword = await bcrypt.hash(password, salt);
      existingUser.password = hashPassword;
    }

    existingUser.mobileNumber = mobileNumber || existingUser.mobileNumber;

    // Save the updated user information
    await existingUser.save();

    // You might want to generate a new token here if any critical information is updated

    return res.status(200).json({
      status: "Success",
      message: "User information updated successfully",
      data: existingUser,
    });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ status: "Fail", error: "Internal Server Error" });
  }
};

exports.signupWithGoogle = async (req, res) => {
  try {
    const { idToken } = req.body;

    const ticket = await oAuth2Client.verifyIdToken({
      idToken,
      audience: process.env.GOOGLE_CLIENT_ID,
    });
    console.log(ticket);
    const { name, email } = ticket.getPayload();

    const existingUser = await User.findOne({
      where: {
        email: email,
      },
    });

    if (existingUser) {
      return res.status(400).json({
        status: "Fail",
        message: "User Already Exists",
      });
    }

    const user = await User.create({
      name: name,
      email: email,
      // You might want to generate a random password for the user or handle it differently
      password: "generatedPassword",
    });

    const payload = {
      id: user.id,
      name: user.name,
      email: user.email,
      password: user.password,
      mobileNumber: user.mobileNumber,
    };

    const token = jwt.sign(payload, process.env.SECRET_KEY, {
      expiresIn: "20d",
    });

    const newToken = await Token.create({
      token: token,
      isActive: true,
      UserId: user.id,
    });

    return res.status(201).json({
      status: "Success",
      message: "User created successfully with Google",
      data: user,
      token: token,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      status: "Fail",
      error: "Internal Server Error",
    });
  }
};
