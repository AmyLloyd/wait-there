const router = require('express').Router();
const { Category, Item } = require('../../models');

const withAuth = require('../../utils/auth');



//http request /api/items/data
router.post('/data', withAuth, async (req, res) => {
    try {
        console.log('Raw request body', req.body);

        if(!req.body.name) {
            return res.status(400).json({ message: `Item name can't be found`});
        };

        const itemData = await Item.create({
            name: req.body.name,
            price: req.body.price,
            status: req.body.status,
            category_id: req.body.category_id
        });

        console.log(itemData, 'itemData');
        res.status(200).json({ item: itemData, message: "New item created"});
    } catch (err) {
        console.error(err);
        res.status(400).json(err);
    };
});

router.delete('/data/:id', withAuth, async (req, res) => {
    try {
        console.log('here');
        console.log(req.params.id);

        const itemData = await Item.destroy({
            where: {
                id: req.params.id
            }
        });

        if(!itemData) {
            res.status(404).json({ message: 'No item found'});
            return;
        }
        res.status(200).json({itemData, message: "Item deleted"});
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;