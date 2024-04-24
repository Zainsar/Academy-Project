const express = require("express");
const AdminController = require("../Controllers/adminControllers.js");
const Auth2 = require("../Middleware/Auth2.js");

const router = express.Router();

router.post("/addadmin", AdminController.add_Admin);

router.get("/getAdmin", Auth2, AdminController.getAdminController);

router.put("/updateAdmin/:admin_id", Auth2, AdminController.updateAdminController);

router.post("/updatePassword/:admin_id", Auth2, AdminController.updatePasswordController);

router.post("/resetPassword", Auth2, AdminController.resetPasswordController);

router.post("/loginAdmin", AdminController.loginAdmin);

router.delete("/deleteAdmin/:admin_id", Auth2, AdminController.deleteAdminController);

module.exports = router;