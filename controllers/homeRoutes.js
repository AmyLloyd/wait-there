const router = require('express').Router();
const withAuth = require('../utils/auth');

const { Admin, Item, Category } = require('../models');


router.get('/', async (req, res) => {
  try {
    const adminData = await Admin.findAll({
      exclude: [{ attributes: password }]
    });

    const admins = adminData.map((admin) =>
    admin.get({ plain:true }) );
  
  res.render('homepage', {
    admins
  });

  } catch(err) {
  res.status(400).json(err);
  }});

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
        },
      ],
    });

    if(!categoryData || categoryData.length === 0) {
      res.status(404).json({ message: "No categories found" });
      return;
    }
   
    const categories = categoryData.map((category) => 
      category.get({ plain:true }));

    res.render('dashboard', {
      categories, 
      logged_in: req.session.logged_in
    });

  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/orders/:id', async (req, res) => {
  try {
    const categoryData = await Category.findAll({ 
      where: { admin_id: req.params.id},
      include: [{ model: Item }],
    });
    console.log('categoryData', categoryData);

    const categories = await categoryData.map((category) => category.get({ plain:true }));
    console.log(categories, 'categories');
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
