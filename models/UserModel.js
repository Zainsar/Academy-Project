const db = require("../config/dbconfig.js")
const Sequelize = require("sequelize");
const Courses = require("./CourseModel.js");
const Like_Dislike = require("./LikeDislike.js");

const User = db.define("User", {
    User_id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
    },
    User_email: {
        type: Sequelize.STRING,
        // allowNull: false,
        unique: {
            name: 'User_email_unique',
            msg: 'Email address is already in use.'
        }
    },
    User_username: {
        type: Sequelize.STRING,
        // allowNull: false,
        unique: {
            name: 'User_Username_unique',
            msg: 'Username is already in use.'
        }
    },
    User_password: {
        type: Sequelize.STRING,
        // allowNull: false,
    },
    User_address: {
        type: Sequelize.STRING,
        // allowNull: false,
    },
    User_phone: {
        type: Sequelize.STRING,
        // allowNull: false,
    }
})

Courses.hasMany(User, { foreignKey: 'C_id' });
User.belongsToMany(Courses, { through: Like_Dislike, foreignKey: 'User_id' });

module.exports = User