// routes/user.js
const express = require('express');
const { listAllTherapist, describeUser } = require('../controllers/userController');
const router = express.Router();

router.get("/therapist", listAllTherapist)
router.get("/profile", describeUser)


module.exports = router;
