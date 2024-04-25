const db = require("../config/dbconfig")
const Sequelize = require("sequelize");
const Franchise_Signup = require("./franchiseModel");

const Courses = db.define("courses", {
    C_id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
    },
    Franchise_id: {
        type: Sequelize.UUID,
        allowNull: false,
    },
    C_Name: {
        type: Sequelize.STRING,
        allowNull: false
    },
    C_Tduration: {
        type: Sequelize.STRING,
        allowNull: false
    },
    C_Mduration: {
        type: Sequelize.STRING,
        allowNull: false
    },
    Timestart: {
        type: Sequelize.STRING,
        allowNull: false
    },
    TimeEnd: {
        type: Sequelize.STRING,
        allowNull: false
    },
    C_Days: {
        type: Sequelize.STRING,
        allowNull: false
    },
    C_Fees: {
        type: Sequelize.STRING,
        allowNull: false
    },
    C_Status: {
        type: Sequelize.STRING,
        allowNull: false,
        defaultValue: () => true
    }
})

Franchise_Signup.hasMany(Courses, { foreignKey: 'Franchise_id' });
Courses.belongsTo(Franchise_Signup, { foreignKey: 'Franchise_id' });

module.exports = Courses