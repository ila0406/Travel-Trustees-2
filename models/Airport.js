const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Airport extends Model {};

Airport.init (
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        city: {
            type: DataTypes.STRING,
            AllowNull: false,
        },
        Country: {
            type: DataTypes.STRING,
            AllowNull: false,
        },
        IATA_code: {
            type: DataTypes.STRING,
            AllowNull: false,
        },
    },
    {
        sequelize,
        timestamps: false,
        freezeTableName: true,
        modelName: 'airports',
    },
);

module.exports = Airport;