// routes/user.js
const express = require('express');
const { listAllTherapist, describeUser, updatePassword, updateProfile, updatePatientData } = require('../controllers/userController');
const router = express.Router();

router.get("/therapist", listAllTherapist)
router.get("/profile", describeUser)

//alterações
router.put("/password", updatePassword)
router.put("/profile", updateProfile)
router.put("/patient-data", updatePatientData)


module.exports = router;
