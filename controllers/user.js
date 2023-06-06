const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const { User } = require('../models');

const userRouter = express.Router();

userRouter.get('/', async (req, res) => {
    const allUsers = await User.findAll({});
    return res.status(200).json(allUsers);
});

userRouter.post('/signup', async (req, res) => {
    try {
        const { username, password, firstName, lastName } = req.body;
        const user = await User.create({ username, password, firstName, lastName });

        res.status(200).json({ user });
    } catch (error) {
        res.status(500).json({ error });
    }
});

userRouter.post('/login', async (req, res) => {
  const { username, password } = req.body;

  const user = await User.findOne({ where: { username } });
  const isValid = bcrypt.compareSync(password, user.password);

  if (isValid) {
    const token = jwt.sign(
      { username },
      process.env.TOKEN_SECRET,
      { expiresIn: '1h' },
    );
  
    res.status(200).json({ token });
  } else {
    res.status(401);
  }
});

module.exports = { userRouter };
