// routes/patient.js
const express = require('express');
const router = express.Router();
const therapistController = require("../controllers/therapistController");

router.get("/", therapistController.getAll);
router.get("/paginate", therapistController.listPaginated);
router.post("/", therapistController.create);
router.put("/:id/toggle", therapistController.toggleActiveStatus);
router.put("/:id", therapistController.update);
router.delete("/:id", therapistController.remove);
router.patch("/therapists/:id/deactivate", therapistController.deactivateTherapist);
router.patch("/therapists/:id/reactivate", therapistController.reactivateTherapist);


module.exports = router;
