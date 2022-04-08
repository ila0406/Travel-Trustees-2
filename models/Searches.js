const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Searches extends Model {};

Searches.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        created_date: {
            type: DataTypes.DATE,
            allowNull: false,
        },
        user_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'user',
                key: 'id',
            },
        },
        airport_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'airports',
                key: 'id',
            },
        },
        country_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'country',
                key: 'id',
            },
        },
        covid_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'covid',
                key: 'id',
            },
        },
        safety_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'safety',
                key: 'id',
            },
        },
        weather_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'weather',
                key: 'id',
            },
        },
    },
    {
        sequelize,
        timestamps: false,
        freezeTableName: true,
        underscored: true,
        modelName: 'searches',
    }
);

module.exports = Searches;