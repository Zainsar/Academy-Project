const db = require("../config/dbconfig.js")
const Sequelize = require("sequelize");

const Franchise_Signup = db.define("Academy_Franchise", {
    fran_id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
    },
    fran_email: {
        type: Sequelize.STRING,
        unique: {
            name: 'Franchise_email_unique',
            msg: 'Email address is already in use.'
        }
    },
    fran_username: {
        type: Sequelize.STRING,
        unique: {
            name: 'Franchise_Username_unique',
            msg: 'Username is already in use.'
        }
    },
    fran_password: {
        type: Sequelize.STRING,
    },
    fran_address: {
        type: Sequelize.STRING,
    },
    fran_phone: {
        type: Sequelize.STRING,
    },
    fran_Status: {
        type: Sequelize.BOOLEAN,
        defaultValue: () => true
    }
})

module.exports = Franchise_Signup