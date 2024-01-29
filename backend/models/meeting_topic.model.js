const { DataTypes, INTEGER } = require('sequelize');
const { sequelize, defaultFields } = require('./config');


const table_name = 'meeting_topic';

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
        defaultValue: ""
    },
    room_id: {
        type: DataTypes.INTEGER,
        allowNull: false
    },  
    details: {
        type: DataTypes.STRING(255),
        allowNull: false,
        defaultValue: ''
    },
    people_count: {
        type: DataTypes.INTEGER(5),
        allowNull: false,
        defaultValue: 1
    },
    status_id: {
        type: INTEGER,
        allowNull: false,
        defaultValue: 1
    },  
    ...defaultFields
});