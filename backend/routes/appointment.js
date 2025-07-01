// routes/authRoutes.js
const express = require('express');
const { create , getAllByUser, deleteAppointment} = require('../controllers/appointmentController');
const router = express.Router();

router.get("", getAllByUser)
router.post("", create)
router.delete("/:id", deleteAppointment)


module.exports = router;
