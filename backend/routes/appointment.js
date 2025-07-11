// routes/authRoutes.js
const express = require('express');
const { create , getAllByTherapist, getAllByUser, deleteAppointment, listPaginated, listAppointmentsByDateRange } = require('../controllers/appointmentController');
const router = express.Router();

router.get("", getAllByUser)
router.get("/paginate", listPaginated);
router.get("/paginate-therapist", listAppointmentsByDateRange);
router.get("/all", getAllByTherapist)
router.post("", create)
router.delete("/:id", deleteAppointment)


module.exports = router;
