// routes/patient.js
const express = require('express');
const router = express.Router();
const therapistController = require("../controllers/therapistController");

router.get("/", therapistController.getAll);
router.post("/", therapistController.create);
router.put("/:id", therapistController.update);
router.delete("/:id", therapistController.remove);

module.exports = router;
