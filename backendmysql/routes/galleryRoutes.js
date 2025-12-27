const express = require("express");
const router = express.Router();
const {
    getGalleryStats,
    updateGalleryStats,
} = require("../controllers/galleryController");

router.get("/gallery-stats", getGalleryStats);
router.post("/gallery-stats", updateGalleryStats);

module.exports = router;