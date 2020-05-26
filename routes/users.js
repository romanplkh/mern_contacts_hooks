const express = require("express");
const router = express.Router();
const controller = require("../controllers/userController.js");
const { validateUser } = require("../models/Validations");

//POST
router.route("/").post(validateUser, controller.registerUser);

//GET

module.exports = router;
