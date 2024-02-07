const { DataTypes } = require("sequelize");
const sequelize = require('../config/index');
const Category = require("./category.model");

const loginQuestion = sequelize.define("loginQuestion", {
   question: {
    type: DataTypes.TEXT,
    allowNull: false
   },
   correct_answer: {
    type: DataTypes.STRING,
    allowNull: false
   },
   answer: {
    type: DataTypes.JSON,
    allowNull: false,
    defaultValue: [],
   }

});
Category.hasMany(loginQuestion, { foreignKey: "CategoryId" });


module.exports = loginQuestion;