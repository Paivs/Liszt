// routes/index.js
const express = require('express');
const authRoutes = require('./authRoutes');
const router = express.Router();
const authMiddleware = require('../middlewares/authMiddleware')

router.use('/auth', authRoutes);

router.use(authMiddleware)


module.exports = router;
