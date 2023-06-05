const { Router } = require('express');
const express = require('express');
const { Achievement, Achievement } = require('../models');

const achievementRouter = express.Router();

// GET Achievements
// GET all achievements
achievementRouter.get('/', async (res,req) => {
	try {
		const allAchievements = await Achievement.findAll({})
		res.status(200).json(allAchievements)
  } catch(error) {
		console.log(error)
		res.status(500).json({msg:'Error Occured', error})
	}
});

// GET achievement by id
achievementRouter.get('/:id', async (req,res) => {
	try {
		const oneAchievements = await Achievement.findOne({
			// ? Double Check
			where: {achievement: req.params.achievement},
			include: [{
				model: Achievement,
			}]
		})
		res.status(200).json(oneAchievements)
	} catch(error) {
		res.status(500).json({msg:'Error Occured', error})
	}
})

// POST
achievementRouter.post('/', async (req,res) => {
	try {
		const {achievementNmae, condition} = req.body;
		const achievement = await Achievement.create({achievementName, condition});
		res.status(200).json({achievement})
	} catch(error) {
		console.log(error)
		res.status(500).json({msg:'Error Occured', error})
	}
});


//* Wrote up there ^^
// achievementRouter.get('/', async (req, res) => {
//     const allAchievements = await Achievement.findAll({});
//     return res.json(allAchievements);
// });

// achievementRouter.post('/', async (req, res) => {
//     try {
//         const { achievementName, condition } = req.body;
//         const achievement = await Achievement.create({ achievementName, condition });
//         res.json({ achievement });
//     } catch (error) {
//         res.json({ error });
//     }
// });

module.exports = { achievementRouter };