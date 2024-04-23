const db = require("../config/dbconfig")
const Sequelize = require("sequelize");
const Courses_Timing = require("./CourseTiminigModel");

const Courses = db.define("courses", {
    C_id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
    },
    C_Name: {
        type: Sequelize.STRING,
        required: [true, "Course Name is required"],
        unique: true,
    },
    C_Tduration: {
        type: Sequelize.STRING,
        required: [true, "Time Duration is required"],
        unique: true,
    },
    C_Mduration: {
        type: Sequelize.STRING,
        required: [true, "Month Duration is required"],
    },
    Time_id: {
        type: Sequelize.INTEGER,
        required: [true, "Time Id is required"],
    },
    C_Days: {
        type: Sequelize.STRING,
        required: [true, "Days is required"],
    },
    C_Fees: {
        type: Sequelize.STRING,
        required: [true, "Fees is require"],
    },
    C_Status: {
        type: Sequelize.STRING,
        required: [true, "Status is require"],
        default: "Active",
        enum: ["Active", "Deactive"],
    }
})

Courses.belongsTo(Courses_Timing, { foreignKey: 'Time_id', onDelete: 'CASCADE' });

module.exports = Courses