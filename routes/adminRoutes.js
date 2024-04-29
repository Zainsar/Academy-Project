const express = require("express");
const { add_Admin, getAdminController, updateAdminController, updatePasswordController,
    resetPasswordController, loginAdmin, deleteAdminController } = require("../Controllers/adminControllers.js");
const Auth2 = require("../Middleware/Auth2.js");

const router = express.Router();

router.post("/addadmin", add_Admin);

router.get("/getAdmin", Auth2, getAdminController);

router.put("/updateAdmin", Auth2, updateAdminController);

router.post("/updatePassword", Auth2, updatePasswordController);

router.post("/resetPassword", Auth2, resetPasswordController);

router.post("/loginAdmin", loginAdmin);

router.delete("/deleteAdmin", Auth2, deleteAdminController);

module.exports = router;