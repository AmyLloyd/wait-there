const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class OrderItem extends Model {}

OrderItem.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: true,
            primaryKey: true,
            autoIncrement: true,
        },
        customerOrder_id: {
            type: DataTypes.INTEGER,
            references: {
                model: 'customerOrder',
                key: 'id'
            }
        },
        item_id: {
            type: DataTypes.INTEGER,
            references: {
                model: 'item',
                key: 'id'
            }
        },
        qty: {
            type: DataTypes.INTEGER,
            defaultValue:1,
            allowNull:false
        }
    },
    {
        sequelize,
        timestamps: false,
        freezeTableName: true,
        underscored: true,
        modelName: 'orderItem'
    }
);

module.exports = OrderItem;