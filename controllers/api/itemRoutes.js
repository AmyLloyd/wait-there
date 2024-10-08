const router = require('express').Router();
const { Category, Item } = require('../../models');

const withAuth = require('../../utils/auth');

//http request /api/items/
router.post('/', withAuth, async (req, res) => {
    try {
        const itemData = await Item.create({
            name: req.body.name,
            price: req.body.price,
            category_id: req.body.category_id
        });
        res.status(200).json({ item: itemData, message: "New item created"});
    } catch (err) {
        console.error(err);
        res.status(400).json(err);
    };
});

router.delete('/:id', withAuth, async (req, res) => {
    try {
        console.log('here,', req.params.id);
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

// UPDATE an item http request: api/items/:item_id
router.put('/:item_id', withAuth, async (req, res) => {
    try {
        console.log('here in update route');
        console.log(req.params.item_id, 'req.params.item_id');
        console.log('request.body.updateStatus', req.body.updateStatus);

      const updatedItem = await Item.update(
        {
            status: req.body.updateStatus,
        },
        {
            where: {
                    id: req.params.item_id,
            },
        });
        console.log(updatedItem, 'updatedItem');
        res.status(200).json(updatedItem);
    } catch (err) {
        console.error(err);
        res.status(400).json(err);
    }
  });


module.exports = router;