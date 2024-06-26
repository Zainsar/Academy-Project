const FranchiseModel = require("../models/franchiseModel.js");
const getToken = require("../Middleware/franAuth.js");
const bcrypt = require("bcryptjs");
const Courses = require("../models/CourseModel.js");

const add_Franchise = async (req, res) => {
    try {

        const salt = bcrypt.genSaltSync(10);
        const hashedPassword = await bcrypt.hash(req.body.fran_password, salt);

        const Franchise = new FranchiseModel({
            fran_email: req.body.fran_email,
            fran_username: req.body.fran_username,
            fran_password: hashedPassword,
            fran_address: req.body.fran_address,
            fran_phone: req.body.fran_phone
        });

        const newFranchise = await Franchise.save();

        res.status(200).json({
            success: true,
            message: "Franchise Added Successfully",
            newFranchise
        });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            name: 'Franchise Username & Email unique',
            error: error.message
        });
    }
};

const getAllFranchise = async (req, res) => {
    try {

        const Franchise = await FranchiseModel.findAll();

        if (!Franchise || Franchise.length === 0) {
            return res.status(404).json({
                success: false,
                message: "Franchise Not Found",
            });
        }

        Franchise.fran_password = undefined;

        res.status(200).json({
            success: true,
            message: "All Franchise get Successfully",
            Franchise,
        });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: "Error in Get All Franchise API",
            error: error.message,
        });
    }
};

const getOneFranchise = async (req, res) => {
    try {

        const Franchise = await FranchiseModel.findByPk(req.body.fran_id);

        if (!Franchise) {
            return res.status(404).json({
                success: false,
                message: "Franchise Not Found",
            });
        }

        Franchise.fran_password = undefined;

        res.status(200).json({
            success: true,
            message: "Franchise Data Found Successfully",
            Franchise,
        });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: "Error in Get One Franchise API",
            error: error.message,
        });
    }
};

const updateFranchiseProfile = async (req, res) => {
    try {

        const { userid, fran_username, fran_address, fran_phone } = req.body;

        const Franchise = await FranchiseModel.update({
            fran_username: fran_username,
            fran_address: fran_address,
            fran_phone: fran_phone
        }, {
            where: { fran_id: userid }
        })

        if (!Franchise) {
            return res.status(404).json({
                success: false,
                message: "Franchise not found",
            })
        }

        res.status(200).json({
            success: true,
            message: "Franchise Profile Updated Successfully",
        });

    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: "Error in Update Profile Franchise API",
            error: error.message,
        });
    }
};

const updateFranchiseStatus = async (req, res) => {
    try {

        const { userid, fran_Status } = req.body;

        const Franchise = await FranchiseModel.update({
            fran_Status: fran_Status
        }, {
            where: { fran_id: userid }
        })

        if (!Franchise) {
            return res.status(404).json({
                success: false,
                message: "Franchise not found",
            })
        }

        res.status(200).json({
            success: true,
            message: "Franchise Status Updated Successfully",
        });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: "Error in Update Status Franchise API",
            error: error.message,
        });
    }
};

const updateFranchisePassword = async (req, res) => {
    try {

        const { userid, fran_oldPassword, fran_newPassword } = req.body;

        if (!fran_oldPassword || !fran_newPassword) {
            return res.status(400).json({
                success: false,
                message: "Bad Request: Please provide old and new password.",
            });
        }

        const Franchise = await FranchiseModel.findOne({ where: { fran_id: userid } });

        if (!Franchise) {
            return res.status(404).json({
                success: false,
                message: "Franchise Not Found",
            });
        }

        const isMatch = await bcrypt.compare(fran_oldPassword, Franchise.fran_password);

        if (!isMatch) {
            return res.status(400).json({
                success: false,
                message: "Invalid old password",
            });
        }

        const salt = bcrypt.genSaltSync(10);
        const hashedPassword = await bcrypt.hash(fran_newPassword, salt);

        await FranchiseModel.update({
            fran_password: hashedPassword
        }, {
            where: { fran_id: userid }
        })

        res.status(200).json({
            success: true,
            message: "Franchise Password Updated!",
        });

    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: "Error in Franchise Password Update API",
            error: error.message,
        });
    }
};

const resetFranchisePassword = async (req, res) => {
    try {

        const { userId, fran_newPassword } = req.body;

        const salt = bcrypt.genSaltSync(10);
        const hashedPassword = await bcrypt.hash(fran_newPassword, salt);

        const updatePassword = await FranchiseModel.update({
            fran_password: hashedPassword
        }, {
            where: { fran_id: userId }
        })

        res.status(200).json({
            success: true,
            message: "Franchise Password Reset Successfully",
        });

    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: "Error in Franchise Password Reset API",
            error: error.message,
        });
    }
};

const loginFranchise = async (req, res) => {
    try {

        const { fran_email, fran_password } = req.body;

        if (!fran_email || !fran_password) {
            return res.status(400).json({
                success: false,
                message: "Bad Request: Please provide email and password.",
            });
        }

        const franchise = await FranchiseModel.findOne({ where: { fran_email } });

        if (!franchise) {
            return res.status(404).json({
                success: false,
                message: "Franchise Not Found",
            });
        }

        if (franchise.fran_Status === false) {
            return res.status(401).json({
                success: false,
                message: "You are blocked by an Admin",
            });
        }

        const isPasswordValid = await bcrypt.compare(fran_password, franchise.fran_password);

        if (!isPasswordValid) {
            return res.status(401).json({
                success: false,
                message: "Incorrect Password",
            });
        }

        const token = getToken(franchise);

        res.status(200).json({
            success: true,
            message: "Franchise Login Successful",
            token,
            franchise: {
                fran_id: franchise.fran_id,
                fran_email: franchise.fran_email,
                fran_username: franchise.fran_username,
                fran_address: franchise.fran_address,
                fran_phone: franchise.fran_phone,
                fran_Status: franchise.fran_Status
            }
        });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({
            message: 'Error in Login Franchise Api',
            error: error.message
        });
    }
};

const deleteFranchise = async (req, res) => {
    try {

        const fran_id = req.body.fran_id;

        const Franchise = await FranchiseModel.findByPk(fran_id);

        if (!Franchise) {
            return res.status(404).json({
                success: false,
                message: "Franchise not found",
            });
        }

        await Franchise.destroy();

        res.status(200).json({
            success: true,
            message: "Franchise deleted successfully",
        });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: "Error in Delete Franchise API",
            error: error.message,
        });
    }
};

const getFranchiseCourses = async (req, res) => {
    try {

        const data = await FranchiseModel.findOne({
            where: { fran_id: req.body.franchiseId },
            include: [{ model: Courses }]
        });

        res.status(200).json({
            success: true,
            message: "Franchise Cources get successfully",
            data: data
        });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: "Error in Delete Franchise API",
            error: error.message,
        });
    }
}

module.exports = {
    add_Franchise,
    getAllFranchise,
    getOneFranchise,
    updateFranchiseProfile,
    updateFranchiseStatus,
    updateFranchisePassword,
    resetFranchisePassword,
    loginFranchise,
    deleteFranchise,
    getFranchiseCourses
};