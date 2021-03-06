const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Safety extends Model {};

Safety.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        safety_rating: {
            type: DataTypes.DECIMAL(3,2),
            AllowNull: false,
        },
        message_text: {
            type: DataTypes.STRING,
            AllowNull: false,
        },
    },
    {
        sequelize,
        timestamps: false,
        freezeTableName: true,
        modelName: 'safety',
    },
);

module.exports = Safety;