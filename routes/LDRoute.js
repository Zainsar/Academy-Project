const express = require("express");
const LDController = require("../Controllers/like_dislikeController.js");
const User = require('../Middleware/userAuth2.js')
const router = express.Router();

router.post("/addLD",User, LDController.add_LD);

router.get("/getallLD", LDController.getAllLD);

router.get("/getoneLD", LDController.getOneLD);

router.get("/getAllLikeD", LDController.getAllLikeDislike);

router.put("/UpdateStatus/:LD_id", LDController.updateLDStatus);

router.get("/likeCourseDetail", LDController.getLikedCourseDetails);

router.delete("/deleteLD/:LD_id", LDController.deleteLD);

module.exports = router;