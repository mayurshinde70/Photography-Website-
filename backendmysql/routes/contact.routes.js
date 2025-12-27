const express = require("express");
const router = express.Router();
const contactController = require("../controllers/contact.controller");

router.post("/", contactController.addContact);
router.get("/", contactController.getAllContacts);
router.put("/:id/status", contactController.updateStatus);

module.exports = router;