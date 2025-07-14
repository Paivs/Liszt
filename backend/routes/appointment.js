const express = require("express");
const {
  create,
  getAllByTherapist,
  getAllByUser,
  deleteAppointment,
  listPaginated,
  listAppointmentsByDateRange,
  getAppointmentSettingsByTherapist, // Adicionando o método para buscar as configurações
  updateAppointmentSettings, // Adicionando o método para atualizar as configurações
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

module.exports = router;
