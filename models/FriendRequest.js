const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');
const User = require('./User');

class FriendRequest extends Model {}

module.exports = FriendRequest.init(
    {
        requester_id: {
            type: DataTypes.STRING, 
            references: {
                model: User,
                key: 'id'
            }
        },
        recipient_id: {
            type: DataTypes.STRING,
            references: {
                model: User,
                key: 'id'
            }
        },
    },
    { sequelize },
);