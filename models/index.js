const User = require('./User');
const Achievement = require('./Achievement');

User.hasMany(Achievement);
Achievement.hasMany(User);

module.exports = {
    User, 
    Achievement,
};