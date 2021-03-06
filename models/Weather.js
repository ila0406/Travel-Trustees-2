const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Weather extends Model {};

Weather.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        icon: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        date: {
            type: DataTypes.DATEONLY,
            allowNull: false,
        },
        temp: {
            type: DataTypes.DECIMAL(5,2),
            AllowNull: false,
        },
        wind_speed: {
            type: DataTypes.DECIMAL(5,2),
            AllowNull: false,
        },
        humidity: {
            type: DataTypes.INTEGER,
            AllowNull: false,
        },
    },
    {
        sequelize,
        timestamps: false,
        freezeTableName: true,
        modelName: 'weather',
    },
);

module.exports = Weather;