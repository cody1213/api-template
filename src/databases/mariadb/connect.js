const { Sequelize } = require("sequelize");
const sequelize = new Sequelize(process.env.MYSQL_DB, process.env.MYSQL_USER, process.env.MYSQL_PASS, {
  host: "localhost",
  dialect: "mariadb" /* one of 'mysql' | 'postgres' | 'sqlite' | 'mariadb' | 'mssql' | 'db2' | 'snowflake' | 'oracle' */,
});

sequelize.authenticate().then(() => {
  console.log("Connection has been established successfully.");
});
