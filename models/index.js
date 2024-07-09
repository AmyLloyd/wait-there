const Admin = require('./Admin');
const Order = require('./Order');
const Item = require('./Item');
const OrderItem = require('./OrderItem');
const Category = require('./Category');

Order.belongsToMany(Item, {
    through: 'orderItem',
    as:'items',
    foreignKey:'order_id'
});

Item.belongsToMany(Order, {
    through:'orderItem',
    as:'orders',
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

module.exports = { Admin, Order, Item, OrderItem, Category };
