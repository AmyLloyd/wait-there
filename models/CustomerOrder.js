const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class CustomerOrder extends Model {}

CustomerOrder.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false, 
            primaryKey: true,
            autoIncrement: true,
            unique:false
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
        date_created: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: DataTypes.NOW,
        },
        total_amount: {
            type: DataTypes.DECIMAL(4,2),
            allowNull: false
        },
        admin_id: {
            type: DataTypes.INTEGER,
            references: {
                model: 'admin',
                key:'id',
            },
            allowNull:false
        }
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