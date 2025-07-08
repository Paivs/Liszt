// routes/authRoutes.js
const express = require('express');
const { createDream, createEmotion, deleteDream, listAllDreams, listAllEmotions, deleteEmotion} = require('../controllers/journalController');
const router = express.Router();


router.post("/dream", createDream)
router.get("/dream", listAllDreams)
router.delete("/dream/:id", deleteDream)
//--//
router.post("/emotion", createEmotion)
router.get("/emotion", listAllEmotions)
router.delete("/emotion/:id",deleteEmotion)

module.exports = router;
