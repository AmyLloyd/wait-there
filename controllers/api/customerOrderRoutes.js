const router = require('express').Router();
const { CustomerOrder, Item, OrderItem } = require('../../models');

const withAuth = require('../../utils/auth');

// https request /api/customerOrders/data

router.post('/data/:id', async (req, res) => {
  console.log('here in route');
  console.log(req.params.id, "req.params.id");
  const { items, sum, cartRef  } = req.body; // Expecting an array of item IDs and the total amount

  if (!items || !sum || !cartRef ) {
    return res.status(400).json({ error: 'All details are required' });
  }

  console.log(req.params.id, "req.params.id");
  try {
    console.log(req.params.id, "req.params.id");
    const newOrder = await CustomerOrder.create({
      total_amount: req.body.sum,
      reference_name: req.body.cartRef,
      admin_id: req.params.id
    });
    
    console.log(newOrder, "newOrder");

    // Add items to the order
    for (const item of items) {
      const existingItem = await Item.findByPk(item);
      if (!existingItem) {
        return res.status(400).json({ error: `Item with ID ${item} not found` });
      }

      // Create entry in OrderItems with quantity
      await OrderItem.create({
        customerOrder_id: newOrder.id,
        item_id: existingItem.id
      });
    }

    res.status(201).json({ message: 'Customer order created successfully', order: newOrder });
  } catch (error) {
    console.error('Error creating customer order:', error);
    res.status(500).json({ error: 'An error occurred while creating the order' });
  }
});

//Update order status at https /api/customerOrders/data/:id

// UPDATE an item http request: api/items/:item_id
router.put('/:order_id', withAuth, async (req, res) => {
  try {
      console.log('here in update route');
      console.log(req.params.item_id, 'req.params.item_id');
      console.log('request.body.updateStatus', req.body.updateStatus);

    const updatedOrder = await Order.update(
      {
          status: req.body.updateStatus,
      },
      {
          where: {
            id: req.params.order_id,
          },
      });
      console.log(updatedOrder, 'updatedOrder');
      res.status(200).json(updatedOrder);
  } catch (err) {
      console.error(err);
      res.status(400).json(err);
  }
});

router.delete('/:order_id', withAuth, async (req, res) => {
  const deletedOrder = await CustomerOrder.destroy({
    where: {
      id: req.params.order_id,
    },
  });
  
  res.json(deletedOrder);
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