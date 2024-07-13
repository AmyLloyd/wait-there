const router = require('express').Router();
const adminRoutes = require('./adminRoutes');
const categoryRoutes = require('./categoryRoutes');
const itemRoutes = require('./itemRoutes');
const orderRoutes = require('./orderRoutes');

router.use('/admins', adminRoutes);
router.use('/categories', categoryRoutes);
router.use('/items', itemRoutes);
router.use('/customerOrders', orderRoutes);

module.exports = router;
