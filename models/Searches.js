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
    }
);

module.exports = Searches;