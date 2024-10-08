const sequelize = require('../config/connection');
const { Model, DataTypes } = require('sequelize');
const bcrypt = require('bcrypt');

class Admin extends Model {
    checkPassword(loginPw) {
        return bcrypt.compareSync(loginPw, this.password);
    }
}

Admin.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        username: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        email_address: {
            type: DataTypes.STRING,
            allowNull: false, 
            unique: true,
            validate: {
                isEmail: true
            },
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len:[6],
            },
        },
    },
    {
        hooks: {
            beforeCreate: async (newAdminData) => {
                newAdminData.password = await bcrypt.hash(newAdminData.password, 10);
                return newAdminData;
            },
            beforeUpdate: async (updatedAdminData) => {
                updatedAdminData.password = await bcrypt.hash(updatedAdminData.password, 10);
                return updatedAdminData;
            }
        },
        sequelize,
        timestamps: false,
        freezeTableName: true,
        underscored: true,
        modelName: 'admin'
    }
);

module.exports = Admin;