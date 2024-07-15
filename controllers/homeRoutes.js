const router = require('express').Router();
const withAuth = require('../utils/auth');

const { Admin, Item, Category, Order, OrderItem } = require('../models');

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
    const categoryData = await Category.findAll({
      where: {
        admin_id: req.session.admin_id,
      },
      include: [
        {
          model : Item,
          attributes: [
              "id",
              "name",
              "price",
              "status",
              "category_id"
          ],
          // include: [
          //   { 
          //     model: Order,
          //     through: OrderItem,
          //     as: "orders",
          //     attributes: [
          //       "id",
          //       "reference_name",
          //       "date_created",
          //       "location",
          //       "status"
          //     ]
          //   }
          // ],
        },
      ],
    });
    // console.log(categoryData, "categoryData");
    //     if(!categoryData || categoryData.length === 0) {
    //   res.status(404).json({ message: "No categories found" });
    //   return;
    // }
   
    const categories = categoryData.map((category) => 
      category.get({ plain:true }));

    res.render('dashboard', {
      categories, 
      logged_in: req.session.logged_in
    });

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
      }],
    });
    
    console.log('categoryData', categoryData);
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

module.exports = router;
