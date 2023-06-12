const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { Op } = require('sequelize');

const { authenticateToken } = require('../middleware');
const { User } = require('../models');

const userRouter = express.Router();

userRouter.get('/', async (_, res) => {
    try {
      const allUsers = await User.findAll({});
      return res.status(200).json(allUsers);
    } catch (error) {
      res.status(500).json({ error });
    }
});

userRouter.get('/:username', async (_, res) => {
    try {
      const user = await User.findByPk(req.params.username);
      return res.status(200).json(user);
    } catch (error) {
      res.status(500).json({ error });
    }
});

userRouter.get('/search/:username', async (req, res) => {
  const { username } = req.params;
  
  try {
    const users = await User.findAll({ 
      where: { username: { [Op.substring]: [username] } }
    });
  
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ error });
  }
});

userRouter.post('/follow/:id', authenticateToken, async (req, res) => {
  const { id: toBeFollwedId } = req.params;
  
  try {
    const currentUser = await User.findByPk(req.user.id);
    const userToBeFollowed = await User.findByPk(toBeFollwedId);
  
    await currentUser.addFollowing(userToBeFollowed);
  
    res.status(200).json({ user: userToBeFollowed });
  } catch (error) {
    res.status(500).json({ error });
  }
});

userRouter.get('/following', authenticateToken, async (req, res) => {
  try {
    const currentUser = await User.findByPk(req.user.id);
    const following = await currentUser.getFollowing();
  
    res.status(200).json(following);
  } catch (error) {
    res.status(500).json({ error });
  }
});

userRouter.get('/followers', authenticateToken, async (req, res) => {
  try {
    const currentUser = await User.findByPk(req.user.id);
    const following = await currentUser.getFollowers();
  
    res.status(200).json(following);
  } catch (error) {
    res.status(500).json({ error });
  }
});

userRouter.post('/signup', async (_, res) => {
    try {
        const user = await User.create({ username, password, firstName, lastName, avatarUrl });

        const token = jwt.sign(
          { username: user.username, id: user.id },
          process.env.TOKEN_SECRET,
          { expiresIn: '1h' },
        );

        res.status(200).json({ user, token });
    } catch (error) {
        res.status(500).json({ error });
    }
});

userRouter.post('/login', async (req, res) => {
  const { username, password } = req.body;
  
  try {
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
  } catch (error) {
    res.status(500).json({ error });
  }
});

module.exports = { userRouter };
