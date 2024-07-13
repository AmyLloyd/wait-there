const sequelize = require('../config/connection');
const { Admin, CustomerOrder, Item, OrderItem, Category } = require('../models');

const adminSeedData = require('./adminSeedData.json');
const categorySeedData = require('./categorySeedData.json');
const itemSeedData = require('./itemSeedData.json');
const customerOrderSeedData = require('./customerOrderSeedData.json');
const orderItemSeedData = require('./orderItemSeedData');


const seedDatabase = async () => {
  try {
    await sequelize.sync({ force: true });
    console.log("sequelize synced");

    const admins = await Admin.bulkCreate(adminSeedData);
    console.log('Admins seeded successfully.');
    const categories = await Category.bulkCreate(categorySeedData);
    console.log('Categories seeded successfully');
    const items = await Item.bulkCreate(itemSeedData);
    console.log('Items seeded successfully.');
    const customerOrders = await CustomerOrder.bulkCreate(customerOrderSeedData);
    console.log('Orders seeded successfully.');
    const orderItems = await OrderItem.bulkCreate(orderItemSeedData);
   
    console.log('Database seeded successfully.');
    process.exit(0);
  
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
};

seedDatabase();