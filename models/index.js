const Admin = require('./Admin');
const CustomerOrder = require('./CustomerOrder');
const Item = require('./Item');
const OrderItem = require('./OrderItem');
const Category = require('./Category');

CustomerOrder.belongsToMany(Item, {
    through: 'orderItem',
    as:'items',
    foreignKey:'customerOrder_id'
});

Item.belongsToMany(CustomerOrder, {
    through:'orderItem',
    as:'customerOrders',
    foreignKey: 'item_id'
});

Admin.hasMany(Category, {
    foreignKey: 'admin_id',
    onDelete: 'CASCADE',
    onUpdate:'CASCADE'
});

Category.belongsTo(Admin, {
});

Category.hasMany(Item, {
    foreignKey: 'category_id',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE'
});

Item.belongsTo(Category, {
});

module.exports = { Admin, CustomerOrder, Item, OrderItem, Category };
