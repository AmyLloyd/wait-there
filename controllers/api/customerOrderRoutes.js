const router = require('express').Router();
const { CustomerOrder, Item, OrderItem } = require('../../models');

const withAuth = require('../../utils/auth');

// https request /api/customerOrders/data

router.post('/data/:id', async (req, res) => {
  const { items, sum, cartRef  } = req.body; // Expecting an array of item IDs and the total amount
  let quantity = 0;

  if (!items || !sum || !cartRef ) {
    return res.status(400).json({ error: 'All details are required' });
  }
  try {
    const customerOrderData = await CustomerOrder.create({
      total_amount: req.body.sum,
      reference_name: req.body.cartRef,
      admin_id: req.params.id
    });
    //Add items to the order
    for (const item of items) {
      const [orderItem, created] = await OrderItem.findOrCreate({
        where: { 
          customerOrder_id: customerOrderData.dataValues.id,
          item_id: item
        }, 
        defaults: {
          customerOrder_id: customerOrderData.dataValues.id,
          item_id:item.id,
          qty: 1
        },
      })
      if (created) {
        console.log("orderItem.dataValues.qty", orderItem.dataValues.qty);
        quantity = 1;
      } else {
        quantity++;
        console.log("orderItem.dataValues.qty", orderItem.dataValues.qty);
        console.log(quantity, "quantity");
      }
      updateQuantity(orderItem.dataValues.customerOrder_id, orderItem.dataValues.item_id, quantity);
    };

    res.status(201).json({ message: 'Customer order created successfully', customerOrderData });
  } catch (error) {
    console.error('Error creating customer order:', error);
    res.status(500).json({ error: 'An error occurred while creating the order' });
  }
});

const updateQuantity = async (orderId, itemId, quantity) => {
  try {
    const updatedOrderItem = await OrderItem.update(
      {qty: quantity},
      {
        where: { 
          customerOrder_id: orderId,
          item_id: itemId,
        }, 
      } 
    );
  } catch(err) {
    console.error(err);
  }
};

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