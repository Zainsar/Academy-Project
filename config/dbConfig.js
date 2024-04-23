const Sequelize = require("sequelize")

const db = new Sequelize(
  "Academy",
  "ZAINSAR",
  "zain123",
  {
    // host: '10.193.113.78',
    host: "DESKTOP-6A48J47\\SQLEXPRESS",
    dialect: "mssql",
    port: '1433',
    dialectOptions: {
      connectTimeout: 100000
    },
    pool: {
      max: 10,
      min: 0,
    },
    options: {
      encrypt: true,
      trustServerCertificate: true,
      enableArithAbort: true
    }
  }
);

module.exports = db