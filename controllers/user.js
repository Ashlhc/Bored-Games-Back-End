const express = require('express');
const userRouter = express.Router();
const {User, Friend} = require('../models');
const sequelize = require('../../config/connection');
const {Op} = require('sequelize');
const bcrypt = require(bcrypt);

// Get All Users
router.get('/', async (req,res) => {
  try {
    const users = await User.findAll({})
    res.status(200).json(users)
  } catch(error) {
    console.log(error)
    res.status(500).json({msg:'Error Occured', error})
  }
});

// Find User by Username
router.get('/search/:username', async (req,res) => {
  try {
    const username = await User.findOne({
      where: {username: req.params.username},
      include: [{
        model: User,
        as: 'Friends',
        through: Friend,
      }]
    })
    if (!username){
        res.status(404).json({msg:'User not found'})
    } else {
    res.status(200).json(username)
    }
  } catch(error) {
    console.log(error)
    res.status(500).json({msg:'Error Occured', error})
  }
});

// *POST
// POST Username, first_name, last_name, email
router.post('/', async (req,res) => {
  try {
    const {username, password, firstName, lastName, email} = req.body;
    const user = await User.create({
      username,
      password,
      firstName,
      lastName,
      email,
    });
    res.status(200).json({msg:'Created Successfully!', user})
  } catch(error) {
    console.log(error)
    res.status(500).json({msg:'Error Occured', error})
  }
});

// POST Add Friend
// ? Might need fixing
router.post('/:userId/addfriend/:friendId', async (req,res) => {
  try {
		const user = User.findByPK(req.params.userId)
    const friend = User.findByPk(res.params.friendId)
    if (!user || !friend){
			res.status(404).json({msg:'Friend not found'})
    } else {
			const addFriend = await Friend.create({status:'request pending'})
			addFriend.addUser(user, {through: UserFriend})
			addFriend.addUser(friend, {through: UserFriend})
			res.status(200).json({msg:'Success!', addFriend})
		}
  } catch(error) {
		console.log(error)
    res.status(500).json({msg:'Error Occured', error})
  }
})

// POST login user
router.post('/login', async (req,res) => {
  console.log(req.body)
  try {
    const foundUser = await User.findOne({
      where:{username: req.body.username}
    })
    if (!foundUser){
      console.log('No user found with this id')
      res.status(403).json({msg:'Invalid username/password'})
    } else {
      if(bcrypt.compareSync(req.body.password, foundUser.password)){
        req.session.userId = foundUser.id
        req.session.username = foundUser.username
        req.session.isUser = true
        req.status(200).json({msg:'Logged In!', foundUser})
      } else {
        res.status(403).json({msg:'Invalid username/password'})
      }
    }
  } catch(error) {
    console.log(error)
    res.status(500).json({msg:'Error Occured', error})
  }
});

// *PUT
//  PUT update User Info by its 'id' value
router.put('/:id', async (req,res) => {
  const {username, firstName, lastName, email} = req.body;
  try {
    const user = await User.findByPK(req.params.id)
    if (!user){
      res.status(404).json({msg:'User not found'})
    }
    if(!Object.keys(req.body).length){
      res.json('Request body is empty')
    } else {
      if(username){
        user.username = username;
        user.save()
      }
      if(firstName){
        user.firstName = firstName
        user.save()
      }
      if(lastName){
        user.lastName = lastName;
        user.save()
      }
      if(email){
        user.email = email;
        user.save()
      }
      res.status(200).json({msg:'Successfully Updated', user})
    }
  } catch(error) {
    console.log(error)
    res.status(500).json({msg:'Error occured', error})
  }
});

// User logout
router.delete('/logout', (req,res) => {
	try {
    req.session.destroy()
    res.status(200).json({msg:'Successfully Logged Out'})
  } catch(error) {
    console.log(error)
    res.status(500).json(error)
  }
});

module.exports = { userRouter };