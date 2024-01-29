const { DataTypes } = require('sequelize');
const { sequelize, defaultFields } = require('./config');


const table_name = 'meeting_topic_status';

module.exports = sequelize.define(table_name, {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true
    },
    name: {
        type: DataTypes.STRING(80),
        allowNull: false,
        unique: true
    },
    ...defaultFields
});