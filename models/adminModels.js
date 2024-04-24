const db = require("../config/dbconfig");
const Sequelize = require("sequelize");

const Admin_Signup = db.define("admin_signup", {
    admin_id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
    },
    admin_email: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: {
            name: 'admin_email_unique',
            msg: 'Email address is already in use.'
        }
    },
    admin_username: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: {
            name: 'admin_username_unique',
            msg: 'Username is already in use.'
        }
    },
    admin_password: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    admin_Age: {
        type: Sequelize.INTEGER,
        allowNull: false,
    },
    admin_address: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    admin_phone: {
        type: Sequelize.STRING,
        allowNull: false,
    }
});
module.exports = Admin_Signup;