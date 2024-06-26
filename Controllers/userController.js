const CourseModel = require("../models/CourseModel.js");
const UserModel = require("../models/UserModel.js");
const getToken = require("../Middleware/userAuth.js");
const bcrypt = require("bcryptjs");
const Franchise_Signup = require("../models/franchiseModel.js");

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

const add_User = async (req, res) => {
    try {

        const salt = bcrypt.genSaltSync(10);
        const hashedPassword = await bcrypt.hash(req.body.User_password, salt);

        const User = new UserModel({
            User_email: req.body.User_email,
            User_username: req.body.User_username,
            User_password: hashedPassword,
            User_address: req.body.User_address,
            User_phone: req.body.User_phone
        });

        const newUser = await User.save();

        res.status(200).json({
            success: true,
            message: "User Added Successfully",
            newUser
        });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            name: "User UserName & Email Unique",
            error: error.message,
        });
    }
};

const getAllUser = async (req, res) => {
    try {

        const User = await UserModel.findAll();

        if (!User || User.length === 0) {
            return res.status(404).json({
                success: false,
                message: "User Not Found",
            });
        }

        User.User_password = undefined;

        res.status(200).json({
            success: true,
            message: "All User get Successfully",
            User,
        });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: "Error in Get All User API",
            error: error.message,
        });
    }
};

const getOneUser = async (req, res) => {
    try {

        const User = await UserModel.findByPk(req.body.User_id);

        if (!User) {
            return res.status(404).json({
                success: false,
                message: "User Not Found",
            });
        }

        User.User_password = undefined;

        res.status(200).json({
            success: true,
            message: "User Data Found Successfully",
            User,
        });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: "Error in Get One User API",
            error: error.message,
        });
    }
};

const updateUserProfile = async (req, res) => {
    try {

        const { uid, User_username, User_address, User_phone } = req.body;

        const User = await UserModel.update({
            User_username: User_username,
            User_address: User_address,
            User_phone: User_phone
        }, {
            where: { User_id: uid }
        });

        if (!User) {
            return res.status(404).json({
                success: false,
                message: "User not found",
            })
        }

        res.status(200).json({
            success: true,
            message: "User Profile Updated Successfully",
        });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: "Error in Update Profile User API",
            error: error.message,
        });
    }
};

const updateUserPassword = async (req, res) => {
    try {

        const { uid, User_oldPassword, User_newPassword } = req.body;

        if (!User_oldPassword || !User_newPassword) {
            return res.status(400).json({
                success: false,
                message: "Bad Request: Please provide old and new password.",
            });
        }

        const User = await UserModel.findOne({ where: { User_id: uid } })

        if (!User) {
            return res.status(404).json({
                success: false,
                message: "User Not Found",
            });
        }
        const isMatch = await bcrypt.compare(User_oldPassword, User.User_password);

        if (!isMatch) {
            return res.status(400).json({
                success: false,
                message: "Invalid old password",
            });
        }

        const salt = bcrypt.genSaltSync(10);
        const hashedPassword = await bcrypt.hash(User_newPassword, salt);

        await UserModel.update({
            User_password: hashedPassword
        }, {
            where: { User_id: uid }
        });

        res.status(200).json({
            success: true,
            message: "User Password Updated!",
        });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: "Error in User Password Update API",
            error: error.message,
        });
    }
};

const resetUserPassword = async (req, res) => {
    try {

        const { uid, User_newPassword } = req.body;

        const salt = bcrypt.genSaltSync(10);
        const hashedPassword = await bcrypt.hash(User_newPassword, salt);

        const User = await UserModel.update({
            User_password: hashedPassword
        }, {
            where: { User_id: uid }
        });

        if (!User) {
            return res.status(404).json({
                success: false,
                message: "User Not Found",
            });
        }

        res.status(200).json({
            success: true,
            message: "User Password Reset Successfully",
        });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: "Error in User Password Reset API",
            error: error.message,
        });
    }
};

const loginUser = async (req, res) => {
    try {

        const { User_email, User_password } = req.body;

        if (!User_email || !User_password) {
            return res.status(400).json({
                success: false,
                message: "Bad Request: Please provide email and password.",
            });
        }

        const User = await UserModel.findOne({ where: { User_email: req.body.User_email } });

        if (!User) {
            return res.status(404).json({
                success: false,
                message: "User Not Found",
            });
        }

        const isPasswordValid = await bcrypt.compare(User_password, User.User_password);

        if (!isPasswordValid) {
            return res.status(401).json({
                success: false,
                message: "Incorrect Password",
            });
        }

        const token = getToken(User);

        res.status(200).json({
            success: true,
            message: "User Login Successful",
            token,
            User: {
                User_id: User.User_id,
                User_email: User.User_email,
                User_username: User.User_username,
                User_address: User.User_address,
                User_phone: User.User_phone
            }
        });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: "Error in Login User API",
            error: error.message,
        });
    }
};

const deleteUser = async (req, res) => {
    try {

        const User_id = req.body.User_id;

        const User = await UserModel.findByPk(User_id);

        if (!User) {
            return res.status(404).json({
                success: false,
                message: "User not found",
            });
        }

        await User.destroy();

        res.status(200).json({
            success: true,
            message: "User deleted successfully",
        });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: "Error in Delete User API",
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

module.exports = {
    add_User,
    loginUser,
    getAllCourse,
    updateUserProfile,
    updateUserPassword,
    resetUserPassword,
    deleteUser,
    getAllUser,
    getOneUser,
    FranchiseWithCourses
};