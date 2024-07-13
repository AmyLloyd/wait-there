const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class CustomerOrder extends Model {}

CustomerOrder.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false, 
            primaryKey: true,
            autoincrement: true,
        },
        reference_name: {
            type:DataTypes.STRING,
            allowNull: false,
        },
        status: {
            type:DataTypes.STRING,
            defaultValue:"Being prepared",
            allowNull: false,
        },
        location: {
            type:DataTypes.STRING,
            allowNull: false,
        },
        date_created: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: DataTypes.NOW,
        },
    },
    {
        sequelize,
        timestamps: false,
        freezeTableName: true,
        underscored: true,
        modelName: 'customerOrder'
    }
)

module.exports = CustomerOrder;