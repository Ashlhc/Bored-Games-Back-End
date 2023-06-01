const express = require('express');
const { User } = require('../models');

const userRouter = express.Router();

userRouter.get('/', async (req, res) => {
    const allUsers = await User.findAll({});
    return res.json(allUsers);
});

userRouter.post('/', async (req, res) => {
    try {
        const { username, password, firstName, lastName } = req.body;
        const user = await User.create({ username, password, firstName, lastName });

        res.json({ user });
    } catch (error) {
        res.json({ error });
    }
});

module.exports = { userRouter };