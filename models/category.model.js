const { DataTypes } = require("sequelize");
const sequelize = require("../config/index");
// const Question = require("../models/questions.model");

const Category = sequelize.define("Category", {
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  },
  category: {
    type: DataTypes.STRING,
    allowNull: false,
  }, 
  image: {
    type: DataTypes.STRING,
    allowNull: true,
  },
});

// Category.hasMany(Question, { foreignKey: "CategoryId" });

module.exports = Category;
