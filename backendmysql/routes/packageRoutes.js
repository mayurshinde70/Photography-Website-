const express = require("express");
const router = express.Router();
const controller = require("../controllers/packageController");

router.get("/", controller.getPackages);
router.post("/", controller.addPackage);
router.put("/:id", controller.updatePackage);
router.delete("/:id", controller.deletePackage);

module.exports = router;