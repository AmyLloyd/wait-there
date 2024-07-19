const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Item extends Model {}

Item.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false, 
            primaryKey: true,
            autoIncrement: true,
        },
        name: {
            type:DataTypes.STRING,
            allowNull: false,
        },
        price: {
            type:DataTypes.DECIMAL(4, 2),
            allowNull: false,
        },
        status: {
            type:DataTypes.STRING,
            allowNull: false,
            defaultValue:'Available'
        },
        category_id: {
            type: DataTypes.INTEGER,
            references: {
                model: 'category',
                key:'id',
            },
            allowNull:false,
        }
    },
    {
        sequelize,
        timestamps: false,
        freezeTableName: true,
        underscored: true,
        modelName: 'item'
    }
)

module.exports = Item;