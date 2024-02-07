const {DataTypes} = require('sequelize');
const sequelize = require('../config/index');
const Category = require('./category.model');
const Question = require('./questions.model');
// const Question = require('./questions.model');

const SubCategory = sequelize.define("SubCategory" ,{
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
    },
    subcategory: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    image: {
        type: DataTypes.STRING,
        allowNull: false
    },
    entryFee: {
        type: DataTypes.INTEGER,
        defaultValue: '100'
    },
    totalPrice: {
        type: DataTypes.INTEGER,
        defaultValue: 10000
    }
});
// Category.hasMany(Question, { foreignKey: "CategoryId" });
// SubCategory.hasMany(Question, { foreignKey: "subCategoryId" });
Category.hasMany(SubCategory, { foreignKey: "CategoryId" });
SubCategory.belongsTo(Category, { foreignKey: "CategoryId" })

module.exports = SubCategory;