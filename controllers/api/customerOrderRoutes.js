const router = require('express').Router();
const { CustomerOrder, Item, OrderItem } = require('../../models');

// https request /api/customerOrders/data

router.post('/data', async (req, res) => {
  const { items, total_amount, reference_name  } = req.body; // Expecting an array of item IDs and the total amount

  if (!items || !total_amount || !reference_name ) {
    return res.status(400).json({ error: 'All details are required' });
  }

  try {
    const newOrder = await CustomerOrder.create({
      total_amount: req.body.total_amount,
      reference_name: req.body.reference_name
    });

    console.log(newOrder, "newOrder");

    // Add items to the order
    for (const item of items) {
      const existingItem = await Item.findByPk(item.id);
      if (!existingItem) {
        return res.status(400).json({ error: `Item with ID ${item.id} not found` });
      }

      // Create entry in OrderItems with quantity
      await OrderItem.create({
        customerOrder_id: newOrder.id,
        item_id: existingItem.id,
        quantity: item.quantity
      });
    }

    res.status(201).json({ message: 'Customer order created successfully', order: newOrder });
  } catch (error) {
    console.error('Error creating customer order:', error);
    res.status(500).json({ error: 'An error occurred while creating the order' });
  }
});


// //http request /api/orders/data
// router.post('/data', withAuth, async (req, res) => {
//   console.log("before try");
//     try {
//       console.log('here');
//       console.log("Raw request data:", req.body);
//       const orderData = await CustomerOrder.create({
//         reference_name: req.body.reference_name,
//         location: req.body.location,
//       });
//       console.log(orderData, 'orderData');
//       res.status(200).json({ order: orderData, message: "New order created" });
//     } catch (err) {
//       console.error(err);
//       res.status(400).json(err);
//     }
//   });
  module.exports = router;