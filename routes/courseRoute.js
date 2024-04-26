const express = require("express");
const CourseController = require("../Controllers/courseController.js");
const Franchise = require("../Middleware/franAuth2.js");
const AdminToken = require("../Middleware/Auth2.js");

const router = express.Router();

// Courses

router.post("/addcourse", Franchise, CourseController.add_Course);

router.get("/getallcourse", Franchise, CourseController.getAllCourse);

router.get("/getonecourse", Franchise, CourseController.getOneCourse);

router.put("/updatecoursepro/:C_id", Franchise, CourseController.updateCourseProfile);

router.put("/updatecoursestatus/:C_id", Franchise, CourseController.updateCourseStatus);

router.delete("/deletecourse/:C_id", Franchise, CourseController.deleteCourse);

// Admin
router.get("/franchiseallcourses", AdminToken, CourseController.FranchiseAllCourses);

router.get("/FranchiseWithCourses", AdminToken, CourseController.FranchiseWithCourses);

module.exports = router;