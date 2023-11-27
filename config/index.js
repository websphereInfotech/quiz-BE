const { Sequelize } = require("sequelize");

const sequelize = new Sequelize("quiz", "root", "123", {
  host: "localhost",
  dialect: "mysql",
});

try {
  sequelize.authenticate();
  sequelize.sync({ alter: true });
  console.log("Connection has been established successfully.");
} catch (error) {
  console.error("Unable to connect to the database:", error);
}

module.exports = sequelize;
