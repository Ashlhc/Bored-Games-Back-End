const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');
const bcrypt = require('bcrypt');

class User extends Model {}

User.init({
    username: {
        type: DataTypes.STRING(20),
        allowNull: false, 
        unique: true,
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false, 
        validate: {
            len: [8],
        },
    },
    firstName: {
        type: DataTypes.STRING,
        allowNull: false, 
    },
    lastName: {
        type: DataTypes.STRING,
        allowNull: false,
    },
},
{
    sequelize,
    hooks: {
        beforeCreate: userObj => {
            userObj.password = bcrypt.hashSync(userObj.password, 3);
            return userObj;
        },
    },
});

module.exports = User;