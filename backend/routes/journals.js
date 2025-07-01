// routes/authRoutes.js
const express = require('express');
const { createDream, createEmotion, listAllDreams} = require('../controllers/journalController');
const router = express.Router();


router.post("/dream", createDream)
router.post("/dream", listAllDreams)
router.post("/emotion", createEmotion)


module.exports = router;
