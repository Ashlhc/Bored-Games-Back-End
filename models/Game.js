const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Game extends Model {}

module.exports = Game.init(
    {
        name: {
            type: DataTypes.STRING,  
        },
        inProgress: {
            type: DataTypes.BOOLEAN,
        },
        scores: {
            type: DataTypes.STRING,
        },
        userTurn: {

        },
    },
    { sequelize },
);