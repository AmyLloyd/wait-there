const sequelize = require('../config/connection');
const { Model, DataTypes } = require('sequelize');

class Category extends Model {}

Category.init(
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
        admin_id: {
            type: DataTypes.INTEGER,
            references: {
                model: 'admin',
                key:'id',
            },
            allowNull: false,
        },
    },
    {
        sequelize,
        timestamps: false,
        freezeTableName: true,
        underscored: true,
        modelName: 'category'
    }
)

module.exports = Category;