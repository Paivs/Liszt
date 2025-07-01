// routes/index.js
const express = require('express');
const authRoutes = require('./authRoutes');
const appointment = require('./appointment');
const userRoutes  = require('./user');
const patientRoutes  = require('./patient');
const journalRoutes  = require('./journals');
const router = express.Router();
const authMiddleware = require('../middlewares/authMiddleware');

router.use('/auth', authRoutes);

router.use(authMiddleware)

router.use('/appointment', appointment);
router.use('/user', userRoutes );
router.use('/patient', patientRoutes );
router.use('/journal', journalRoutes );

module.exports = router;
