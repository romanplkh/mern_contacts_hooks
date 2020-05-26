const express = require("express");
const router = express.Router();
const controller = require("../controllers/authController.js");

router.route("/").get(controller.getAuthUser).post(controller.login);

module.exports = router;
