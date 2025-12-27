const express = require("express");
const router = express.Router();
const admin = require("../controllers/adminController");

router.post("/visits", admin.addVisit);
router.get("/visits", admin.getVisits);
router.get("/visits/graph", admin.getVisitGraph);

module.exports = router;