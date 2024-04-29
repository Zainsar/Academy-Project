const express = require("express");
const { add_Course, getAllCourse, getOneCourse, updateCourseProfile, updateCourseStatus,
    deleteCourse, FranchiseAllCourses, FranchiseWithCourses } = require("../Controllers/courseController.js");
const Franchise = require("../Middleware/franAuth2.js");
const AdminToken = require("../Middleware/Auth2.js");

const router = express.Router();

// Courses

router.post("/addcourse", Franchise, add_Course);

router.get("/getallcourse", Franchise, getAllCourse);

router.get("/getonecourse", Franchise, getOneCourse);

router.put("/updatecoursepro", Franchise, updateCourseProfile);

router.put("/updatecoursestatus", Franchise, updateCourseStatus);

router.delete("/deletecourse", Franchise, deleteCourse);

// Admin
router.get("/franchiseallcourses", AdminToken, FranchiseAllCourses);

router.get("/FranchiseWithCourses", AdminToken, FranchiseWithCourses);

module.exports = router;