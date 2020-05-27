const express = require("express");
const router = express.Router();
const controller = require("../controllers/authController.js");
const { vaildateLogin } = require("../models/Validations");

const auth = require("../middleware/auth");

//@ROUTE:  /api/auth
router
  .route("/")
  .get(auth, controller.getAuthUser)
  .post(vaildateLogin, controller.login);

module.exports = router;
