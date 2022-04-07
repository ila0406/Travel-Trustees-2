const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Covid extends Model {};

Covid.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        population: {
            type: DataTypes.INTEGER,
            AllowNull: false,
            default_value: 0,
        },
        cases_per_million: {
            type: DataTypes.INTEGER,
            AllowNull: false,
            default_value: 0,
        },
        todays_cases: {
            type: DataTypes.INTEGER,
            AllowNull: false,
            default_value: 0,
        },
        active_cases_per_million: {
            type: DataTypes.INTEGER,
            AllowNull: false,
            default_value: 0,
        },
        total_recovered: {
            type: DataTypes.INTEGER,
            AllowNull: false,
            default_value: 0,
        },
    },
    {
        sequelize,
        timestamps: false,
        freezeTableName: true,
        modelName: 'covid',
    },
);

module.exports = Covid;