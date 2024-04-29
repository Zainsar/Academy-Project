const { where } = require("sequelize");
const LDModel = require("../models/LikeDislike.js");
const User = require("../models/UserModel.js");
const Courses = require("../models/CourseModel.js");
const tokedid = require('../Middleware/userAuth.js');
const Like_Dislike = require("../models/LikeDislike.js");

const add_LD = async (req, res) => {
    try {

        const LD = new LDModel({
            U_id: req.User.User_id,
            Course_id: req.body.Cid,
            LD_Status: req.body.status,
        });

        const newLD = await LD.save();

        if (LD.LD_Status == true) {
            res.status(200).json({
                success: true,
                message: "You Like This Course",
                newLD
            });
        } else {
            res.status(200).json({
                success: true,
                message: "You DisLike This Course",
                newLD
            });

        }
    }
    catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: "Error in Add LD API",
            error: error.message,
        });
    }
};

const getwhishListCources = async (req, res) => {
    try {

        if (req.body.status == true) {
            const data = await User.findOne({
                where: { User_id: req.body.userId },
                include: [{
                    model: Like_Dislike, where: { LD_Status: true },
                    include: [{ model: Courses }]
                }]
            });

            res.status(200).json({
                success: true,
                message: "Get All Like Courses successfully",
                data: data
            });
        }
        else if (req.body.status == false) {
            const data = await User.findOne({
                where: { User_id: req.body.userId },
                include: [{
                    model: Like_Dislike, where: { LD_Status: false },
                    include: [{ model: Courses }]
                }]
            });

            res.status(200).json({
                success: true,
                message: "Get All Dislike Courses successfully",
                data: data
            });
        }
        else {
            const data = await User.findOne({
                where: { User_id: req.body.userId },
                include: [{
                    model: Like_Dislike,
                    include: [{ model: Courses }]
                }]
            });

            res.status(200).json({
                success: true,
                message: "Get All like Dislike Courses successfully",
                data: data
            });
        }
    }
    catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: "Error in Add LD API",
            error: error.message,
        });
    }
}

const updateLDStatus = async (req, res) => {
    try {

        const { lid, LD_Status } = req.body;

        const LD = await LDModel.update({
            LD_Status: LD_Status
        }, {
            where: { LD_id: lid }
        });

        if (!LD) {
            return res.status(404).json({
                success: false,
                message: "LD not found",
            })
        }

        res.status(200).json({
            success: true,
            message: "Status update Successfully",
        });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: "Error in Update Status LD API",
            error: error.message,
        });
    }
};

const deleteLD = async (req, res) => {
    try {

        const LD_id = req.body.lid;

        const LD = await LDModel.findByPk(LD_id);

        if (!LD) {
            return res.status(404).json({
                success: false,
                message: "LD not found",
            });
        }

        await LD.destroy();

        res.status(200).json({
            success: true,
            message: "LD deleted successfully",
        });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: "Error in Delete LD API",
            error: error.message,
        });
    }
};

module.exports = {
    add_LD,
    getwhishListCources,
    updateLDStatus,
    deleteLD
};