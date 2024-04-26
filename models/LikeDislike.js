const db = require("../config/dbconfig.js");
const Sequelize = require("sequelize");
const Courses = require("./CourseModel.js");

const Like_Dislike = db.define("Like_Dislike", {
    LD_id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
    },
    U_id: {
        type: Sequelize.UUID,
    },
    Course_id: {
        type: Sequelize.UUID,
    },
    LD_Status: {
        type: Sequelize.BOOLEAN,
    }
});

Like_Dislike.belongsTo(Courses, { foreignKey: "Course_id" })

module.exports = Like_Dislike;
