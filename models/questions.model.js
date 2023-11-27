const { DataTypes } = require("sequelize");
const sequelize = require("../config/index");
const Answer = require("./answer.model");

const Question = sequelize.define("Question", {
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  },
  question: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: false,
  },
  A:{
    type: DataTypes.STRING,
    allowNull: false
  },
  B:{
    type: DataTypes.STRING,
    allowNull: false
  },
  C:{
    type: DataTypes.STRING,
    allowNull: false
  },
  D:{
    type: DataTypes.STRING,
    allowNull: false
  },
  category:{
    type: DataTypes.STRING,
    allowNull: false
  }
});

Question.hasOne(Answer);

module.exports = Question;
