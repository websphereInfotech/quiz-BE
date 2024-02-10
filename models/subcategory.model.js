const { DataTypes } = require("sequelize");
const sequelize = require("../config/index");
const Category = require("./category.model");
// const Question = require('./questions.model');

const SubCategory = sequelize.define("SubCategory", {
  _id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  img: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  entryFee: {
    type: DataTypes.INTEGER,
    defaultValue: 100,
  },
  totalPrice: {
    type: DataTypes.INTEGER,
    defaultValue: 10000,
  },
  CategoryId: {
    type: DataTypes.INTEGER,
  },
});

SubCategory.belongsTo(Category, { foreignKey: "CategoryId", as: "category" });


module.exports = SubCategory;
