const { DataTypes } = require('sequelize');
const { sequelize, defaultFields } = require('./config');


const table_name = "meeting_question";

module.exports = sequelize.define(table_name, {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true
    },
    question_text: {
        type: DataTypes.STRING(255),
        allowNull: false,
        defaultValue: ''
    },
    ...defaultFields
});