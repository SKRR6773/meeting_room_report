const { DataTypes } = require('sequelize');
const { sequelize, defaultFields } = require('./config');


const table_name = 'user_role';

module.exports = sequelize.define(table_name, {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true
    },
    code: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    role: {
        type: DataTypes.ENUM("admin", "user"),
        allowNull: false,
        defaultValue: "user"
    },
    ...defaultFields
});