const db = require("../config/dbconfig")
const Sequelize = require("sequelize")

const Courses_Timing = db.define("courses_timing", {
    Time_id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
    },
    Timestart: {
        type: Sequelize.STRING,
        required: [true, "Time Start is required"],
        unique: true,
    },
    TimeEnd: {
        type: Sequelize.STRING,
        required: [true, "Time End is required"],
        unique: true,
    }
})

module.exports = Courses_Timing