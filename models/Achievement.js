const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Achievement extends Model {}

module.exports = Achievement.init(
    {
        achievementName: {
            type: DataTypes.STRING,
        },
        condition: {
            type: DataTypes.STRING,
        },
    },
    { sequelize },
);