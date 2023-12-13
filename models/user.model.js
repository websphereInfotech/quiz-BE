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
  mobileNumber: {
    type: DataTypes.STRING,
  },
  coins:{
    type : DataTypes.INTEGER,
    defaultValue: 200,
  }

});

User.hasMany(tokenModel)

module.exports = User;