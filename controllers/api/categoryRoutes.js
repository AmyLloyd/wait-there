const router = require('express').Router();
const { Category, Item } = require('../../models');

const withAuth = require('../../utils/auth');

//http request /api/categories/data/new
router.post("/data/new", withAuth, async (req, res) => {
    try {
        //Log the raw request body
        console.log('Raw request body', req.body);

        if (!req.body.name) {
            return res.status(400).json({ message: 'Category name is required' });
        }

        const categoryData = await Category.create({
            name: req.body.name,
            admin_id: req.session.admin_id
        });
        console.log(categoryData, "categoryData");
        res.status(200).json({ category: categoryData, message: "category submitted" });
      
    } catch (err) {
        res.status(400).json(err);
    };
});

router.delete('/:id', withAuth, async (req, res) => {
    try {
        console.log(req.params.id)
        const categoryData = await Category.destroy({
            where: {
                id: req.params.id,
                admin_id: req.session.admin_id,
            },
        });

        if(!categoryData) {
            res.status(404).json({ message: 'No category found with this id'});
            return;
        }
        res.status(200).json({ categoryData, message: "Category and all items removed" });
        
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;