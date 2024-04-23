const express = require("express");
const AdminController = require("../Controllers/adminControllers.js");

const router = express.Router();

router.post("/addadmin", AdminController.add_Admin);

router.get("/getUser", AdminController.getAdminController);

router.put("/updateUser", AdminController.updateAdminController);

router.post("/updatePassword", AdminController.updatePasswordController);

router.post("/resetPassword", AdminController.resetPasswordController);

module.exports = router;