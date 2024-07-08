const router = require('express').Router();
const withAuth = require('../utils/auth');

const { Admin, Item, Category } = require('../models');

router.get('/', async (req, res) => {
  try {
    // Get all items and JOIN with admin data
    const itemData = await Item.findAll({
        include: [
            
                { model: Admin, attributes: { exclude: ['password'] }},
                { model: Category }
        ],
        order:["category_id"],
    });
    console.log('itemData', itemData);
    // Serialize data so templates can read it
    const items = itemData.map((item) => item.get({ plain: true }));
 

    // Pass serialized data into Handlebars.js template
    res.render('homepage', { 
        items, categories
        // logged_in: req.session.logged_in
     });
  } catch (err) {
    res.status(500).json(err);
  }
});

// router.get('/', async (req, res) => {
//     try {
//         const adminData = await Admin.findByPk(req.session.user_id, {
//             attributes: {exclude: ['password'] },
//             include: [ { model: Item }, { model: Order }],
//         });

//         const admin = adminData.get({ plain:true });

//         res.render('homepage', {
//             ...admin,
//             // logged_in: true
//         });
//     } catch (err) {
//         res.status(500).json(err);
//     }
// })

router.get('/login', (req, res) => {
    // If the user is already logged in, redirect the request to another route
    if (req.session.logged_in) {
      res.redirect('/dashboard');
      return;
    }
  
    res.render('login');
  });

module.exports = router;
