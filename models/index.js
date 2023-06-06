const User = require('./User');
const Game = require('./Game');

User.belongsToMany(User, { through: 'UserFollowers', as: 'followers', foreignKey: 'followingId' });
User.belongsToMany(User, { through: 'UserFollowers', as: 'following', foreignKey: 'followerId' });

User.hasMany(Game, { foreignKey: 'guesserId', as: 'guessedGames' });
User.hasMany(Game, { foreignKey: 'questionerId', as: 'questionedGames' });

Game.belongsTo(User, { foreignKey: 'guesserId', as: 'guesser' });
Game.belongsTo(User, { foreignKey: 'questionerId', as: 'questioner' });

module.exports = {
    User,
    Game,
};