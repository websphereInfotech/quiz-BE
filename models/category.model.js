const { DataTypes, Sequelize } = require("sequelize");
const sequelize = require("../config/index");
// const Question = require("../models/questions.model");

const Category = sequelize.define("Category", {
  _id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  img: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

module.exports = Category;
