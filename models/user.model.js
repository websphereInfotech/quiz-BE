const { DataTypes } = require("sequelize");
const sequelize = require("../config/index");
const tokenModel = require('./token.model')

const User = sequelize.define("User", {
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING,
    defaultValue: "X User",
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  mobileNumber: { 
    type: DataTypes.INTEGER,
  },
  coins:{
    type: DataTypes.INTEGER,
    defaultValue: 0
  },
  admin: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
});

User.hasMany(tokenModel)

module.exports = User;