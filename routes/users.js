const express = require("express");
const router = express.Router();
const controller = require("../controllers/userController.js");

//POST
router.route("/").post(controller.registerUser);

//GET

module.exports = router;
