const { DataTypes } = require("sequelize");
const sequelize = require("../config/index");
const Question = require("./questions.model");
// const db = require('./index')

const Answer = sequelize.define("Answer", {
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  },
  answer: {
    type: DataTypes.STRING,
  },
  isCorrect: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  } 
});

// Answer.belongsTo(Question)

module.exports = Answer;
