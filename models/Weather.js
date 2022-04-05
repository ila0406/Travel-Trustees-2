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
        searched_text: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        icon: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        date: {
            type: DataTypes.DATE,
            allowNull: false,
        },
        temp: {
            type: DataTypes.DECIMAL(3,2),
            AllowNull: false,
        },
        wind_speed: {
            type: DataTypes.DECIMAL(3,2),
            AllowNull: false,
        },
        humidity: {
            type: DataTypes.INTEGER,
            AllowNull: false,
        },
        user_id: {
            type: DataTypes.INTEGER,
            references: {
              model: 'user',
              key: 'id',
            },
        },
    },
    {
        sequelize,
        timestamps: false,
        freezeTableName: true,
        modelName: 'resultWeather',
    },
);

module.exports = Weather;