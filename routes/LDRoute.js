const express = require("express");
const { getwhishListCources, add_LD } = require("../Controllers/like_dislikeController.js");
const User = require('../Middleware/userAuth2.js')
const router = express.Router();


router.post("/addLD", User, add_LD);
router.post("/getwhishListCources", User, getwhishListCources);

// router.get("/getallLD", LDController.getAllLD);

// router.get("/getoneLD", LDController.getOneLD);

// router.get("/getAllLikeD", LDController.getAllLikeDislike);

// router.put("/UpdateStatus/:LD_id", LDController.updateLDStatus);

// router.get("/likeCourseDetail", LDController.getLikedCourseDetails);

// router.get("/dislikecourse", LDController.seeallDislikeCourse);

// router.get("/likecourse", LDController.seealllikeCourse);

// router.delete("/deleteLD/:LD_id", LDController.deleteLD);

module.exports = router;