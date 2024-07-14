const router = require('express').Router();
const adminRoutes = require('./adminRoutes');
const categoryRoutes = require('./categoryRoutes');
const itemRoutes = require('./itemRoutes');
const orderRoutes = require('./customerOrderRoutes');
// const orderItemRoutes = require('./orderItemRoutes');

router.use('/admins', adminRoutes);
router.use('/categories', categoryRoutes);
router.use('/items', itemRoutes);
router.use('/customerOrders', orderRoutes);
// router.use('/orderItemRoutes', orderItemRoutes);

module.exports = router;
