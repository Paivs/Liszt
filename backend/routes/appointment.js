const express = require("express");
const {
  create,
  getAllByTherapist,
  getAllByUser,
  deleteAppointment,
  listPaginated,
  listAppointmentsByDateRange,
  getAppointmentSettingsByTherapist,
  updateAppointmentSettings, 
  createByTherapist,
  updateByTherapist,
} = require("../controllers/appointmentController");
const router = express.Router();

router.get("/settings", getAppointmentSettingsByTherapist);
router.put("/settings", updateAppointmentSettings);

router.get("", getAllByUser);
router.get("/paginate", listPaginated);
router.get("/paginate-therapist", listAppointmentsByDateRange);
router.get("/all", getAllByTherapist);
router.post("", create);
router.delete("/:id", deleteAppointment);

router.post("/therapist", createByTherapist);
router.put("/therapist/:id", updateByTherapist)
module.exports = router;
