const { DataTypes } = require('sequelize');
const { sequelize, defaultFields } = require('./config');


const table_name = "meeting_room";

module.exports = sequelize.define(table_name, {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true
    },
    name: {
        type: DataTypes.STRING(255),
        allowNull: false,
        unique: true
    },
    ...defaultFields
});