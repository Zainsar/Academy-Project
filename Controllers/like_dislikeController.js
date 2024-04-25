const { where } = require("sequelize");
const LDModel = require("../models/LikeDislike.js");
const User = require("../models/UserModel.js");
const Courses = require("../models/CourseModel.js");
const tokedid = require('../Middleware/userAuth.js')

const add_LD = async (req, res) => {
    console.log('<<<<<<<<<<<<>>>>>>>>>>>>>',req.body)
    try {
        const LD = new LDModel({
            U_id: req.User.User_id,
            Course_id: req.body.Cid
        });

        const newLD = await LD.save();

        res.status(200).json({
            success: true,
            message: "You Like This Course",
            newLD
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: "Error in Add LD API",
            error: error.message,
        });
    }
};

const getAllLD = async (req, res) => {
    try {
        const LD = await LDModel.findAll();
        if (!LD || LD.length === 0) {
            return res.status(404).json({
                success: false,
                message: "LD Not Found",
            });
        }

        res.status(200).json({
            success: true,
            message: "All LD get Successfully",
            LD,
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: "Error in Get All LD API",
            error: error.message,
        });
    }
};

const getOneLD = async (req, res) => {
    try {
        const LD = await LDModel.findOne(req.params.LD_id);
        if (!LD) {
            return res.status(404).json({
                success: false,
                message: "LD Not Found",
            });
        }

        res.status(200).json({
            success: true,
            message: "LD Data Found Successfully",
            LD,
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: "Error in Get One LD API",
            error: error.message,
        });
    }
};

const getAllLikeDislike = async (req, res) => {
    try {
        const LD = await LDModel.findAll({ where: { LD_Status: req.body.Status } });
        if (!LD) {
            return res.status(404).json({
                success: false,
                message: "Like Dislike Not Found",
            });
        }

        res.status(200).json({
            success: true,
            message: "Like Dislike Data Found Successfully",
            LD,
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: "Error in Get All Like API",
            error: error.message,
        });
    }
};

const updateLDStatus = async (req, res) => {
    try {
        const LD = await LDModel.findByPk(req.params.LD_id);

        if (!LD) {
            return res.status(404).json({
                success: false,
                message: "LD not found",
            })
        }
        const { LD_Status } = req.body;
        if (LD_Status) LD.LD_Status = LD_Status;

        await LD.save();

        res.status(200).json({
            success: true,
            message: "Status update Successfully",
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: "Error in Update Status LD API",
            error: error.message,
        });
    }
};

const getLikedCourseDetails = async (req, res) => {
    try {
        const likeDetails = await LDModel.findOne({
            where: {
                U_id: req.params.userId,
                Course_id: req.params.cId
            },
            include: [
                { model: Courses, as: 'likedCourse' },
                { model: User, as: 'likedUser' },
                { model: LDModel, as: 'liked' }
            ]
        });

        if (!likeDetails) {
            return res.status(404).json({
                success: false,
                message: "Like details not found",
            });
        }

        res.status(200).json({
            success: true,
            message: "Like details found successfully",
            likeDetails,
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: "Error in retrieving like details",
            error: error.message,
        });
    }
}

const deleteLD = async (req, res) => {
    try {
        const LD_id = req.params.LD_id;

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
    } catch (error) {
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
    getAllLD,
    getOneLD,
    getAllLikeDislike,
    updateLDStatus,
    getLikedCourseDetails,
    deleteLD
};