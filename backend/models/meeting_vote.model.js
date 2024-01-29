const { DataTypes } = require('sequelize');
const { sequelize, defaultFields } = require('./config');


const table_name = 'meeting_vote';

module.exports = sequelize.define(table_name, {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true
    },
    topic_id: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    ...defaultFields
});