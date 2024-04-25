const db = require("../config/dbconfig.js");
const Sequelize = require("sequelize");

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
        type: Sequelize.STRING,
        defaultValue: () => true,
    }
});

module.exports = Like_Dislike;
