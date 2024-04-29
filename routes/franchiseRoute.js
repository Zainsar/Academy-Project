const express = require("express");
const { updateFranchiseProfile, updateFranchisePassword, resetFranchisePassword, loginFranchise,
    updateFranchiseStatus, add_Franchise, getAllFranchise, getOneFranchise, deleteFranchise,
    getFranchiseCourses } = require("../Controllers/franchiseControllers.js");
const Franchise = require("../Middleware/franAuth2.js");
const AdminToken = require("../Middleware/Auth2.js");

const router = express.Router();

// Franchise

router.put("/updatefranpro", Franchise, updateFranchiseProfile);

router.post("/updatePasswordfran", Franchise, updateFranchisePassword);

router.post("/resetPasswordfran", Franchise, resetFranchisePassword);

router.post("/loginfranchise", loginFranchise);

// Admin 

router.put("/updatefranStatus", AdminToken, updateFranchiseStatus);

router.post("/addfran", AdminToken, add_Franchise);

router.get("/getallfran", AdminToken, getAllFranchise);

router.get("/getonefran", AdminToken, getOneFranchise);

router.delete("/deletefran", AdminToken, deleteFranchise);

router.post("/getFranchiseCourses", AdminToken, getFranchiseCourses);

module.exports = router;