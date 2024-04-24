const db = require("../config/dbconfig.js")
const Sequelize = require("sequelize")

const Franchise_Signup = db.define("franchise_signup", {
    fran_id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
    },
    fran_email: {
        type: Sequelize.STRING,
        // allowNull: false,
        unique: {
            name: 'Franchise_email_unique',
            msg: 'Email address is already in use.'
        }
    },
    fran_username: {
        type: Sequelize.STRING,
        // allowNull: false,
        unique: {
            name: 'Franchise_Username_unique',
            msg: 'Username is already in use.'
        }
    },
    fran_password: {
        type: Sequelize.STRING,
        // allowNull: false,
    },
    fran_address: {
        type: Sequelize.STRING,
        // allowNull: false,
    },
    fran_phone: {
        type: Sequelize.STRING,
        // allowNull: false,
    },
    fran_Status: {
        type: Sequelize.BOOLEAN,
        defaultValue: () => true
        // allowNull: false,
    }
})

module.exports = Franchise_Signup