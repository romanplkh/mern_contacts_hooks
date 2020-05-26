const express = require("express");
const router = express.Router();
const controller = require("../controllers/contactController");

router.route("/").get(controller.getAllContacts).post(controller.addContact);

router
  .route("/:id")
  .put(controller.updateContact)
  .delete(controller.deleteContact);

module.exports = router;
