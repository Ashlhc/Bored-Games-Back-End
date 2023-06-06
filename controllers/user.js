const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { Op } = require('sequelize');

const { authenticateToken } = require('../middleware');
const { User } = require('../models');

const userRouter = express.Router();

userRouter.get('/', async (req, res) => {
    const allUsers = await User.findAll({});
    return res.status(200).json(allUsers);
});

userRouter.get('/search/:username', async (req, res) => {
  const { username } = req.params;

  const users = await User.findAll({ 
    where: { username: { [Op.substring]: [username] } }
  });

  res.status(200).json(users);
});

userRouter.post('/follow/:id', authenticateToken, async (req, res) => {
  const { id: toBeFollwedId } = req.params;

  const currentUser = await User.findByPk(req.user.id);
  const userToBeFollowed = await User.findByPk(toBeFollwedId);

  currentUser.addFollowing(userToBeFollowed);

  res.status(200);
});

userRouter.get('/following', authenticateToken, async (req, res) => {
  const currentUser = await User.findByPk(req.user.id);
  const following = await currentUser.getFollowing();

  res.status(200).json(following);
});

userRouter.get('/followers', authenticateToken, async (req, res) => {
  const currentUser = await User.findByPk(req.user.id);
  const following = await currentUser.getFollowers();

  res.status(200).json(following);
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
      { username: user.username, id: user.id },
      process.env.TOKEN_SECRET,
      { expiresIn: '1h' },
    );
  
    res.status(200).json({ token });
  } else {
    res.status(401);
  }
});

module.exports = { userRouter };
