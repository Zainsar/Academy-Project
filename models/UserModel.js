const db = require("../config/dbconfig.js")
const Sequelize = require("sequelize");
const Like_Dislike = require("./LikeDislike.js");

const User = db.define("User", {
    User_id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
    },
    User_email: {
        type: Sequelize.STRING,
        unique: {
            name: 'User_email_unique',
            msg: 'Email address is already in use.'
        }
    },
    User_username: {
        type: Sequelize.STRING,
        unique: {
            name: 'User_Username_unique',
            msg: 'Username is already in use.'
        }
    },
    User_password: {
        type: Sequelize.STRING,
    },
    User_address: {
        type: Sequelize.STRING,
    },
    User_phone: {
        type: Sequelize.STRING,
    }
})

User.hasMany(Like_Dislike, { foreignKey: "U_id" })

module.exports = User