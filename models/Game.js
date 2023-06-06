const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Game extends Model {}

module.exports = Game.init(
    {
        word: {
            type: DataTypes.STRING,
        },
        maxGuessCount: {
            type: DataTypes.INTEGER,
        },
        guessedLetters: {
            // comma separated list
            type: DataTypes.STRING,
        },
    },
    { sequelize },
);