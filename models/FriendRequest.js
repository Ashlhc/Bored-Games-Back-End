const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

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
        reciepient_id: {
            type: DataTypes.STRING,
            references: {
                model: User,
                key: 'id'
            }
        },
    },
    { sequelize },
);