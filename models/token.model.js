const { DataTypes } = require("sequelize");
const sequelize = require("../config/index");
const User = require('./user.model')


const Token = sequelize.define("Token", {
  token: {
    type: DataTypes.STRING,
  },
  isActive: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
});



module.exports = Token;

