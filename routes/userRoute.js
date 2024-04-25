const express = require("express");
const UserController = require("../Controllers/userController.js");
const User = require("../Middleware/userAuth2.js");
const AdminToken = require("../Middleware/Auth2.js");

const router = express.Router();

//User

router.post("/adduser", UserController.add_User);

router.post("/loginUser", UserController.loginUser);

router.put("/updateuserpro/:User_id", User, UserController.updateUserProfile);

router.post("/updatePassworduser/:User_id", User, UserController.updateUserPassword);

router.post("/resetPassworduser", User, UserController.resetUserPassword);

router.delete("/deleteuser/:User_id", User, UserController.deleteUser);

// Courses

router.get("/AllCourses", User, UserController.getAllCourse);

// Admin

router.get("/getalluser", AdminToken, UserController.getAllUser);

router.get("/getoneuser", AdminToken, UserController.getOneUser);

module.exports = router;