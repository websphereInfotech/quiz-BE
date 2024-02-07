const { DataTypes } = require("sequelize");
const sequelize = require("../config/index");
const Answer = require("./answer.model");
const SubCategory = require("./subcategory.model");

const Question = sequelize.define("Question", {
  subCategoryId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  category: {
    type: DataTypes.STRING,
    // unique: true,
    allowNull: false,
  },
  question:{
    type: DataTypes.STRING,
    allowNull: false
  },
  correct_answer:{
    type: DataTypes.STRING,
    allowNull: false
  },
  answer: {
    type: DataTypes.JSON,
    allowNull: false,
    defaultValue: [],
   },
});

Question.belongsTo(SubCategory, { foreignKey: "subCategoryId" });


module.exports = Question;
