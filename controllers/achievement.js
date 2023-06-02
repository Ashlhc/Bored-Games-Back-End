const express = require('express');
const { Achievement } = require('../models');

const achievementRouter = express.Router();

achievementRouter.get('/', async (req, res) => {
    const allAchievements = await Achievement.findAll({});
    return res.json(allAchievements);
});

achievementRouter.post('/', async (req, res) => {
    try {
        const { achievementName, condition } = req.body;
        const achievement = await Achievement.create({ achievementName, condition });
        res.json({ achievement });
    } catch (error) {
        res.json({ error });
    }
});

module.exports = { achievementRouter };