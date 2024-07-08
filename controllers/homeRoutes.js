const router = require('express').Router();
const withAuth = require('../utils/auth');

const { Admin, Item, Category } = require('../models');

router.get('/dashboard', withAuth, async (req, res) => {
  try {
    console.log(req.session.admin_id, "req.session.admin_id");
    const adminData = await Admin.findByPk(req.session.admin_id, {
      attributes: { exclude: ['password'] },
      include: [{
        model: Category,
        include: [{
          model: Item
        }]
      }]
    });

    if (!adminData) {
      res.status(404).json({ message: 'Admin not found' });
      return;
    }

    const admin = adminData.get({ plain:true });

    res.render('dashboard', {
      ...admin, 
      logged_in: true
    });
    console.log(admin, "admin");
  } catch(err) {
    res.status(500).json(err);
  }
});

// router.get('/', async (req, res) => {
//   try {
//     // Get all items and JOIN with admin data
//     const itemData = await Item.findAll({
//         include: [
            
//                 { model: Admin, attributes: { exclude: ['password'] }},
//                 { model: Category }
//         ],
//         order:["category_id"],
//     });
//     console.log('itemData', itemData);
//     // Serialize data so templates can read it
//     const items = itemData.map((item) => item.get({ plain: true }));
 

//     // Pass serialized data into Handlebars.js template
//     res.render('homepage', { 
//         items, categories
//         // logged_in: req.session.logged_in
//      });
//   } catch (err) {
//     res.status(500).json(err);
//   }
// });


router.get('/login', (req, res) => {
    // If the user is already logged in, redirect the request to another route
    if (req.session.logged_in) {
      res.redirect('/dashboard');
      return;
    }
    res.render('login');
  });

module.exports = router;
