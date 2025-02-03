const { Sequelize } = require("sequelize");

module.exports = new Sequelize(
  process.env.DB_NAME, // Название БД
  process.env.DB_USER, // Имя пользоватеоя
  process.env.DB_PASSWORD, // Пароль пользователя
  {
    dialect: "postgres",
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    dialectOptions: {
      charset: "utf8",
    },
  }
);
