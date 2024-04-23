const db = require("../config/dbconfig")
const Sequelize = require("sequelize")

const Admin_Signup = db.define("admin_signup", {
    admin_id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
    },
    admin_email: {
        type: Sequelize.STRING,
        required: [true, "email is required"],
        unique: true,
    },
    admin_username: {
        type: Sequelize.STRING,
        required: [true, "Username is required"],
        unique: true,
    },
    admin_password: {
        type: Sequelize.STRING,
        required: [true, "password is required"],
    },
    admin_Age: {
        type: Sequelize.INTEGER,
        required: [true, "age is required"],
    },
    admin_address: {
        type: Sequelize.STRING,
        required: [true, "Address is required"],
    },
    admin_phone: {
        type: Sequelize.STRING,
        required: [true, "phone number is require"],
    }
})

module.exports = Admin_Signup