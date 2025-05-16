const { DataTypes, Model } = require('sequelize');
const sequelize = require('../config/database');

class Application extends Model { }

Application.init({
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    company: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    role: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    location: {
        type: DataTypes.STRING,
        allowNull: true
    },
    link: {
        type: DataTypes.TEXT,
        allowNull: true
    },
    stage: {
        type: DataTypes.STRING,
        defaultValue: 'Applied',
        allowNull: false
    },
    dateApplied: {
        type: DataTypes.DATEONLY,
        allowNull: false
    },
    lastContactDate: {
        type: DataTypes.DATEONLY,
        allowNull: true
    },
    notes: {
        type: DataTypes.TEXT,
        allowNull: true
    },
}, {
    sequelize,
    modelName: 'Application',
    tableName: 'applications',
    timestamps: true,
});

module.exports = Application;
