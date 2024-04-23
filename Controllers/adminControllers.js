const AdminModel = require("../models/adminModels.js");
const bcrypt = require("bcryptjs");

const add_Admin = async (req, res) => {
    try {
        const salt = bcrypt.genSaltSync(10);
        const hashedPassword = await bcrypt.hash(req.body.admin_password, salt);

        const admin = new AdminModel({
            admin_email: req.body.admin_email,
            admin_username: req.body.admin_username,
            admin_password: hashedPassword,
            admin_Age: req.body.admin_Age,
            admin_address: req.body.admin_address,
            admin_phone: req.body.admin_phone
        });

        const newAdmin = await admin.save();

        res.status(200).send(newAdmin);
        console.log(newAdmin);
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
};

const getAdminController = async (req, res) => {
    try {
        const admin = await AdminModel.findById(req.params.admin_id);

        if (!admin) {
            return res.status(404).send({
                success: false,
                message: "Admin Not Found",
            });
        }

        admin.admin_password = undefined;

        res.status(200).send({
            success: true,
            message: "Admin get Successfully",
            admin,
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Error in Get Admin API",
            error: error.message,
        });
    }
};

const updateAdminController = async (req, res) => {
    try {
        const admin = await AdminModel.findById(req.params.admin_id);

        if (!admin) {
            return res.status(404).send({
                success: false,
                message: "Admin not found",
            });
        }

        const { admin_username, admin_address, admin_phone } = req.body;
        if (admin_username) admin.admin_username = admin_username;
        if (admin_address) admin.admin_address = admin_address;
        if (admin_phone) admin.admin_phone = admin_phone;

        await admin.save();

        res.status(200).send({
            success: true,
            message: "Admin Updated Successfully",
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Error in Update Admin API",
            error: error.message,
        });
    }
};

const updatePasswordController = async (req, res) => {
    try {
        const admin = await AdminModel.findById(req.params.admin_id);

        if (!admin) {
            return res.status(404).send({
                success: false,
                message: "Admin Not Found",
            });
        }

        const { admin_oldPassword, admin_newPassword } = req.body;
        if (!admin_oldPassword || !admin_newPassword) {
            return res.status(400).send({
                success: false,
                message: "Bad Request: Please provide old and new password.",
            });
        }

        const isMatch = await bcrypt.compare(admin_oldPassword, admin.admin_password);
        if (!isMatch) {
            return res.status(400).send({
                success: false,
                message: "Invalid old password",
            });
        }

        const salt = bcrypt.genSaltSync(10);
        const hashedPassword = await bcrypt.hash(admin_newPassword, salt);
        admin.admin_password = hashedPassword;

        await admin.save();

        res.status(200).send({
            success: true,
            message: "Password Updated!",
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Error in Password Update API",
            error: error.message,
        });
    }
};

const resetPasswordController = async (req, res) => {
    try {
        const { admin_email, admin_newPassword } = req.body;
        if (!admin_email || !admin_newPassword) {
            return res.status(400).send({
                success: false,
                message: "Bad Request: Please provide email and new password.",
            });
        }
        const admin = await AdminModel.findOne({ admin_email });
        if (!admin) {
            return res.status(404).send({
                success: false,
                message: "Admin Not Found",
            });
        }

        const salt = bcrypt.genSaltSync(10);
        const hashedPassword = await bcrypt.hash(admin_newPassword, salt);
        admin.admin_password = hashedPassword;
        await admin.save();
        res.status(200).send({
            success: true,
            message: "Password Reset Successfully",
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Error in Password Reset API",
            error: error.message,
        });
    }
};

module.exports = {
    add_Admin,
    getAdminController,
    updateAdminController,
    updatePasswordController,
    resetPasswordController
};