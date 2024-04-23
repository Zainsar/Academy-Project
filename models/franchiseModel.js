const db = require("../config/dbconfig")
const Sequelize = require("sequelize")

const Franchise_Signup = db.define("franchise_signup", {
    fran_id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
    },
    fran_email: {
        type: Sequelize.STRING,
        required: [true, "email is required"],
        unique: true,
    },
    fran_username: {
        type: Sequelize.STRING,
        required: [true, "Username is required"],
        unique: true,
    },
    fran_password: {
        type: Sequelize.STRING,
        required: [true, "password is required"],
    },
    fran_Age: {
        type: Sequelize.INTEGER,
        required: [true, "age is required"],
    },
    fran_address: {
        type: Sequelize.STRING,
        required: [true, "Address is required"],
    },
    fran_phone: {
        type: Sequelize.STRING,
        required: [true, "phone number is require"],
    },
    fran_Status: {
        type: Sequelize.STRING,
        required: [true, "Status is require"],
        default: "Active",
        enum: ["Active", "Deactive"],
    }
})

module.exports = Franchise_Signup