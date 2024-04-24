const express = require("express");
const FranchiseController = require("../Controllers/franchiseControllers.js");
const Franchise = require("../Middleware/franAuth2.js");
const AdminToken = require("../Middleware/Auth2.js");

const router = express.Router();

router.post("/addfran", AdminToken, FranchiseController.add_Franchise);

router.get("/getallfran", AdminToken, FranchiseController.getAllFranchise);

router.get("/getonefran", AdminToken, FranchiseController.getOneFranchise);

router.put("/updatefranpro/:fran_id", Franchise, FranchiseController.updateFranchiseProfile);

router.put("/updatefranStatus/:fran_id", AdminToken, FranchiseController.updateFranchiseStatus);

router.post("/updatePasswordfran/:fran_id", Franchise, FranchiseController.updateFranchisePassword);

router.post("/resetPasswordfran", Franchise, FranchiseController.resetFranchisePassword);

router.post("/loginfranchise", FranchiseController.loginFranchise);

router.delete("/deletefran/:fran_id", AdminToken, FranchiseController.deleteFranchise);

module.exports = router;