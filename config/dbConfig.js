const Sequelize = require("sequelize")

const db = new Sequelize(
  "academy",
  "root",
  "",
  {
    // host: '10.193.113.78',
    host: "127.0.0.1",
    dialect: "mysql",
    port: '3306',
    dialectOptions: {
      connectTimeout: 100000
    },
    pool: {
      max: 10,
      min: 0,
    },
    // options: {
    //   encrypt: true,
    //   trustServerCertificate: true,
    //   enableArithAbort: true
    // }
  }
);

module.exports = db