const router = require('express').Router();
const withAuth = require('../utils/auth');

const { Admin, Item, Category, CustomerOrder, OrderItem } = require('../models');

router.get('/', async (req, res) => {
  try {
    const adminData = await Admin.findAll({
      attributes: { exclude: ['password'] }
    });
    const admins = adminData.map(admin => admin.get({ plain: true }));

    res.render('homepage', { admins });
  } catch (err) {
    res.status(400).json(err);
  }
});

router.get('/dashboard', withAuth, async (req, res) => {
  try {
    const adminData = await Admin.findByPk(req.session.admin_id, {
      attributes: { exclude: ['password'] },
      include: [
        {
          model: Category,
          include: [
            {
              model: Item
            }
          ]
        },
        { model: CustomerOrder,
          attributes: [
            'reference_name',
            'status',
            'date_created',
            'total_amount',
            'id',
            'location'
          ],
          // include: [{ model: Item, 
          //   through: OrderItem, as:"items",
          //   attributes: [
          //     'id',
          //     'name',
          //     'status'
          //   ]
          // }]
          include: [
            {
              model: OrderItem,
              include: [Item]
            }
          ]
        }
      ]
    });

    if (!adminData) {
      res.status(404).json({ message: 'Admin not found'});
      return;
    }

    const admin = adminData.get({ plain: true });
    
    res.render('dashboard', {       
      admin,
      logged_in: req.session.logged_in });
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
});

router.get('/orders/:id', async (req, res) => {
  try {
    const categoryData = await Category.findAll({ 
      where: { admin_id: req.params.id},
      include: [{ model: Item,
        where: { status: "Available"}
      }],
    });
    const categories = await categoryData.map((category) => category.get({ plain:true }));
    res.render('order', {
      categories
    });
  } catch(err) {
    res.status(400).json(err);
  }
});

router.get('/login', (req, res) => {
    // If the user is already logged in, redirect the request to another route
    if (req.session.logged_in) {
      res.redirect('/dashboard');
      return;
    }
    res.render('login');
  });

  router.get('/confirmation/:id/:order_id', async (req, res) => {
    try {
      const { id, order_id } = req.params;
      const adminData = await Admin.findByPk(id, {
        attributes: { exclude: ['password'] },
        include: [
          { model: CustomerOrder,
            where: { 
              id: order_id
            }, 
            attributes: [
              'reference_name',
              'status',
              'date_created',
              'total_amount',
              'id',
              'location'
            ],
            include: [{ model: Item, 
              through: OrderItem, as:"items",
              attributes: [
                'id',
                'name',
                'price'
              ]
            }]
          }
        ]
      });
  
      if (!adminData) {
        res.status(404).json({ message: 'Admin or order not found'});
        return;
      }
  
      const admin = adminData.get({ plain: true });

      //     // You can now use the order_id for further processing, e.g., filtering orders
      // const specificOrder = admin.CustomerOrders.find(customerorder => customerorder.id === parseInt(order_id));
      
      // // If the specific order is not found, you can handle that case too
      // if (!specificOrder) {
      //   return res.status(404).json({ message: 'Order not found' });
      // }
      
      res.render('confirmation', {       
        admin
      });
    } catch (err) {
      console.error(err);
      res.status(500).json(err);
    }
  });

module.exports = router;
