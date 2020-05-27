const express = require("express");
const router = express.Router();
const controller = require("../controllers/contactController");
const { validateCreateContact } = require("../models/Validations");
const auth = require("../middleware/auth");

router
  .route("/")
  .get(auth, controller.getAllContacts)
  .post([auth, validateCreateContact], controller.addContact);

router
  .route("/:id")
  .put([auth, validateCreateContact], controller.updateContact)
  .delete(auth, controller.deleteContact);

module.exports = router;
