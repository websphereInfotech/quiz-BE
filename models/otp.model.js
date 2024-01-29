const { DataTypes } = require("sequelize");
const sequelize = require("../config/index");

const Otp = sequelize.define("Otp", {
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
      isEmail: true,
    },
  },
  otp: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
});

module.exports = Otp;
