const CourseModel = require("../models/CourseModel.js");
const Franchise = require("../models/franchiseModel.js");
const getToken = require("../Middleware/franAuth.js");
const { Where } = require("sequelize/lib/utils");
const Franchise_Signup = require("../models/franchiseModel.js");

const add_Course = async (req, res) => {
    try {

        const Course = new CourseModel({
            Franchise_id: req.Franchise.fran_id,
            C_Name: req.body.C_Name,
            C_Tduration: req.body.C_Tduration,
            C_Mduration: req.body.C_Mduration,
            Timestart: req.body.Timestart,
            TimeEnd: req.body.TimeEnd,
            C_Days: req.body.C_Days,
            C_Fees: req.body.C_Fees
        });

        const newCourse = await Course.save();

        res.status(200).json({
            success: true,
            message: "Course Added Successfully",
            newCourse
        });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: "Error add_Course API",
            error: error.message,
        });
    }
};

const getAllCourse = async (req, res) => {
    try {

        const Course = await CourseModel.findAll();

        if (!Course || Course.length === 0) {
            return res.status(404).json({
                success: false,
                message: "Course Not Found",
            });
        }

        res.status(200).json({
            success: true,
            message: "All Course get Successfully",
            Course,
        });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: "Error in Get All Course API",
            error: error.message,
        });
    }
};

const FranchiseAllCourses = async (req, res) => {
    try {

        const Course = await CourseModel.findAll({ Where: { Franchise_id: req.body.Franchise_id } });

        if (!Course || Course.length === 0) {
            return res.status(404).json({
                success: false,
                message: "Franchise & Courses Not Found",
            });
        }

        res.status(200).json({
            success: true,
            message: "Franchise All Courses get Successfully",
            Course,
        });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: "Error in Get Franchise All Courses API",
            error: error.message,
        });
    }
};

const FranchiseWithCourses = async (req, res) => {
    try {

        const Course = await CourseModel.findOne({
            where: { C_id: req.body.id },
            include: [{ model: Franchise_Signup }]
        });

        if (!Course) {
            return res.status(404).json({
                success: false,
                message: "Franchise & Courses Not Found",
            });
        }

        res.status(200).json({
            success: true,
            message: "Franchise All Courses get Successfully",
            Course,
        });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: "Error in Get Franchise All Courses API",
            error: error.message,
        });
    }
};

const getOneCourse = async (req, res) => {
    try {

        const Course = await CourseModel.findByPk(req.body.C_id);

        if (!Course) {
            return res.status(404).json({
                success: false,
                message: "Course Not Found",
            });
        }

        res.status(200).json({
            success: true,
            message: "Course Data Found Successfully",
            Course,
        });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: "Error in Get One Course API",
            error: error.message,
        });
    }
};

const updateCourseProfile = async (req, res) => {
    try {

        const { cid, Franchise_id, C_Name, C_Tduration, C_Mduration, C_Timestart, C_TimeEnd, C_Days, C_Fees } = req.body;

        const Course = await CourseModel.update({
            Franchise_id: Franchise_id,
            C_Name: C_Name,
            C_Tduration: C_Tduration,
            C_Mduration: C_Mduration,
            C_Timestart: C_Timestart,
            C_TimeEnd: C_TimeEnd,
            C_Days: C_Days,
            C_Fees: C_Fees
        }, {
            where: { C_id: cid }
        });

        if (!Course) {
            return res.status(404).json({
                success: false,
                message: "Course not found",
            })
        }

        res.status(200).json({
            success: true,
            message: "Course Profile Updated Successfully",
        });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: "Error in Update Profile Course API",
            error: error.message,
        });
    }
};

const updateCourseStatus = async (req, res) => {
    try {

        const { cid, C_Status } = req.body;

        const Course = await CourseModel.update({
            C_Status: C_Status
        }, {
            where: { C_id: cid }
        })

        if (!Course) {
            return res.status(404).json({
                success: false,
                message: "Course not found",
            })
        }

        res.status(200).json({
            success: true,
            message: "Course Status Updated Successfully",
        });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: "Error in Update Status Course API",
            error: error.message,
        });
    }
};

const deleteCourse = async (req, res) => {
    try {

        const C_id = req.body.C_id;

        const Course = await CourseModel.findOne(C_id);

        if (!Course) {
            return res.status(404).json({
                success: false,
                message: "Course not found",
            });
        }

        await Course.destroy();

        res.status(200).json({
            success: true,
            message: "Course deleted successfully",
        });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: "Error in Delete Course API",
            error: error.message,
        });
    }
};

module.exports = {
    add_Course,
    getAllCourse,
    FranchiseAllCourses,
    FranchiseWithCourses,
    getOneCourse,
    updateCourseProfile,
    updateCourseStatus,
    deleteCourse
};