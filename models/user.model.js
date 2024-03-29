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
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      isEmail: true
    }
  },
  coins:{
    type : DataTypes.INTEGER,
    defaultValue: 200,
    allowNull: false
  }

});

User.hasMany(tokenModel)

module.exports = User;