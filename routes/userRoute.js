const express = require("express");
const { add_User, loginUser, updateUserProfile, updateUserPassword, resetUserPassword, deleteUser,
    FranchiseWithCourses, getAllCourse, getAllUser, getOneUser } = require("../Controllers/userController.js");
const User = require("../Middleware/userAuth2.js");
const AdminToken = require("../Middleware/Auth2.js");

const router = express.Router();

//User

router.post("/adduser", add_User);

router.post("/loginUser", loginUser);

router.put("/updateuserpro", User, updateUserProfile);

router.post("/updatePassworduser", User, updateUserPassword);

router.post("/resetPassworduser", User, resetUserPassword);

router.delete("/deleteuser", User, deleteUser);

router.get("/CourseswithFranchise", User, FranchiseWithCourses);

// Courses

router.get("/AllCourses", User, getAllCourse);

// Admin

router.get("/getalluser", AdminToken, getAllUser);

router.get("/getoneuser", AdminToken, getOneUser);

module.exports = router;