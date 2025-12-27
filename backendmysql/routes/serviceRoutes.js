const express = require("express");
const router = express.Router();
const {
    getServices,
    addService,
    updateService,
    deleteService,
} = require("../controllers/serviceController");

router.get("/", getServices); // public
router.post("/", addService); // admin
router.put("/:id", updateService); // admin
router.delete("/:id", deleteService); // admin

module.exports = router;