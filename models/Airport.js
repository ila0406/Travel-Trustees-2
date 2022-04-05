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
        searched_text: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        name: {
            type: DataTypes.STRING,
            AllowNull: false,
        },
        code: {
            type: DataTypes.STRING,
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
        modelName: 'resultAirports',
    },
);

module.exports = Airport;