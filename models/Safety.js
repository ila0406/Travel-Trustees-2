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
        searched_text: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        safety_rating: {
            type: DataTypes.DECIMAL(3,2),
            AllowNull: false,
        },
        message_text: {
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
        modelName: 'resultSafety',
    },
);

module.exports = Safety;