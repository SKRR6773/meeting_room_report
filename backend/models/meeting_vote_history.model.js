const { DataTypes } = require('sequelize');
const { sequelize, defaultFields } = require('./config');


const table_name = 'meeting_vote_history';

module.exports = sequelize.define(table_name, {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true
    },
    score: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 1
    },
    question_id: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    vote_id: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    ...defaultFields
});