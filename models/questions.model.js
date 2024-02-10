const { DataTypes, Sequelize } = require("sequelize");
const sequelize = require("../config/index");
const SubCategory = require("./subcategory.model");

const Question = sequelize.define("Question", {
  _id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  },
  question: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  correct: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  coins: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  answer: {
    type: DataTypes.JSON,
    allowNull: false,
    defaultValue: [],
  },
});

Question.belongsTo(SubCategory, {
  foreignKey: "SubCategoryId",
  as: "quiz",
});

module.exports = Question;
