// routes/user.js
const express = require('express');
const { listAllTherapist } = require('../controllers/userController');
const router = express.Router();

router.get("/therapist", listAllTherapist)


module.exports = router;
