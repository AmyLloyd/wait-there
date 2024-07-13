const router = require('express').Router();
const { CustomerOrder, Item } = require('../../models');

const withAuth = require('../../utils/auth');

//http request /api/orders/data
router.post('/data', withAuth, async (req, res) => {
    try {
      console.log('here');
      console.log("Raw request data:", req.body);
      const orderData = await CustomerOrder.create({
        reference_name: req.body.reference_name,
        location: req.body.location,
      });
      console.log(orderData, 'orderData');
      res.status(200).json({ order: orderData, message: "New order created" });
    } catch (err) {
      console.error(err);
      res.status(400).json(err);
    }
  });
  module.exports = router;