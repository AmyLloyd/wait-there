const router = require('express').Router();
const adminRoutes = require('./adminRoutes');
const categoryRoutes = require('./categoryRoutes');
const itemRoutes = require('./itemRoutes');

router.use('/admins', adminRoutes);
router.use('/categories', categoryRoutes);
router.use('/items', itemRoutes);

module.exports = router;
