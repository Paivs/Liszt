// routes/user.js
const express = require('express');
const { listAllTherapist, describeUser, updatePassword } = require('../controllers/userController');
const router = express.Router();

router.get("/therapist", listAllTherapist)
router.get("/profile", describeUser)

//alterações
router.put("/password", updatePassword)


module.exports = router;
