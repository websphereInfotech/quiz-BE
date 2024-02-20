const { Op } = require("sequelize");
const Token = require("../models/token.model");
const User = require("../models/user.model");
const jwt = require("jsonwebtoken");
const secret = process.env.SECRET_KEY;

const IsVerify = async (req, res, next) => {
  const auth = req.headers["authorization"];
  if (!auth) {
    return res.status(402).json({
      status: "Fail",
      message: "token is not provide",
    });
  }
  const token = auth.split(" ")[1];

  if (!token) {
    return res.status(404).json({
      status: "Fail",
      message: "Required is Login",
    });
  }

  jwt.verify(token, secret, async (error, UserID) => {
    try {
      // Fetch additional Admin data including role
      const validUser = await User.findOne({
        where:{
          id: UserID.id
        }
      });

      if (!validUser) {
        return res.status(404).json({
          status: "Fail",
          message: "Required is Login",
        });
      }

      req.user = validUser
      console.log("goging for next page ", req.user);
      next();
    } catch (error) {
      return res.status(403).json({
        status: "Fail",
        message: "UserToken is Invalid",
      });
    }
  });
};

module.exports = { IsVerify };
