const router = require('express').Router();
const adminRoutes = require('./adminRoutes');
const categoryRoutes = require('./categoryRoutes');

router.use('/admins', adminRoutes);
router.use('/categories', categoryRoutes);

module.exports = router;
