const db = require("../config/dbconfig")
const Sequelize = require("sequelize");
const Courses = require("./CourseModel");
const Franchise_Signup = require("./franchiseModel");

const own_course = db.define("own_course", {
    own_id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
    },
    Course_id: {
        type: Sequelize.STRING,
        required: [true, "id is required"],
        unique: true,
    },
    Franchise_id: {
        type: Sequelize.STRING,
        required: [true, "id is required"],
        unique: true,
    }
})

own_course.belongsTo(Courses, { foreignKey: 'Course_id', onDelete: 'CASCADE' });
own_course.belongsTo(Franchise_Signup, { foreignKey: 'Franchise_id', onDelete: 'CASCADE' });

module.exports = own_course