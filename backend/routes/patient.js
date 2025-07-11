// routes/patient.js
const express = require('express');
const { createPatient, listAllPatients, deletePatientAndUser, updatePatient, listPaginated } = require('../controllers/patientController');
const router = express.Router();

router.get("", listAllPatients)
router.get("/paginate", listPaginated)
router.post("", createPatient)
router.delete("/:id", deletePatientAndUser)
router.put("/:id", updatePatient);


module.exports = router;
