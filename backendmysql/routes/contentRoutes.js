const express = require("express");
const router = express.Router();

const {
    getContent,
    saveContent,
} = require("../controllers/contentController");

router.get("/", getContent);
router.post("/", saveContent);

module.exports = router;