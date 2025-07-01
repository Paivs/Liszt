// routes/patient.js
const express = require('express');
const { createPatient, listAllPatients, deletePatientAndUser } = require('../controllers/patientController');
const router = express.Router();

router.get("", listAllPatients)
router.post("", createPatient)
router.delete("/:id", deletePatientAndUser)

module.exports = router;
