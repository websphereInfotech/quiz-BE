const { DataTypes } = require("sequelize");
const sequelize = require("../config/index");
const User = require('./user.model')
// const db = require('./index')


const Token = sequelize.define("Token", {
  token: {
    type: DataTypes.STRING,
  },
  isActive: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
});

// Token.belongsTo(User);


module.exports = Token;

