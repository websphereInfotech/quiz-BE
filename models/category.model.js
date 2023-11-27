const { DataTypes } = require("sequelize");
const sequelize = require("../config/index");
const Question = require("../models/questions.model");

const Category = sequelize.define("Category", {
  category: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
});

Category.hasMany(Question, { foreignKey: "CategoryId" });

module.exports = Category;
