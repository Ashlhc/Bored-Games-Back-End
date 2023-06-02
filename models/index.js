const User = require('./User');
const Achievement = require('./Achievement');
const FriendRequest = require('./FriendRequest');

User.hasMany(Achievement);

User.belongsToMany(User, {
    through: FriendRequest,
    as: 'requester',
    foreignKey: 'requester_id'
});
User.belongsToMany(User, {
    through: FriendRequest, 
    as: 'recipient',
    foreignKey: 'recipient_id'
});

Achievement.hasMany(User);

module.exports = {
    User, 
    Achievement,
    FriendRequest,
};