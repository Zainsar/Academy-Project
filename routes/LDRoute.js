const express = require("express");
const { add_LD, getwhishListCources, updateLDStatus, deleteLD } = require("../Controllers/like_dislikeController.js");
const User = require('../Middleware/userAuth2.js')
const router = express.Router();

router.post("/addLD", User, add_LD);

router.post("/getwhishListCources", User, getwhishListCources);

router.put("/UpdateStatus", User, updateLDStatus);

router.delete("/deleteLD", User, deleteLD);

module.exports = router;