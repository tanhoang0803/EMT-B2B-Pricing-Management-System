const express = require('express');
const router = express.Router();

router.use('/auth', require('./authRoutes'));
router.use('/customers', require('./customerRoutes'));
router.use('/pricing', require('./pricingRoutes'));
router.use('/orders', require('./orderRoutes'));

module.exports = router;
