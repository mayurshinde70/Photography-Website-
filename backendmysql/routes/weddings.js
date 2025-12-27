const express = require("express");
const router = express.Router();
const ctrl = require("../controllers/weddingController");

router.get("/", ctrl.getAllWeddings);
router.get("/slug/:slug", ctrl.getWeddingBySlug); // 🔥 MUST BE ABOVE /:id
router.get("/:id/photos", ctrl.getWeddingPhotos);

router.post("/", ctrl.addWedding);
router.put("/:id", ctrl.updateWedding);
router.delete("/:id", ctrl.deleteWedding);

router.post("/:id/photos", ctrl.addWeddingPhotos);
router.delete("/photo/:photoId", ctrl.deleteWeddingPhoto);

module.exports = router;