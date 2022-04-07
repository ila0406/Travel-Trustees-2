const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Country extends Model {};

Country.init(
    {
        country: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        alpha_2_code: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        alpha_3_code: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
        },
    },
    {
        sequelize,
        timestamps: false,
        freezeTableName: true,
        modelName: 'country',
    },
);

module.exports = Country;