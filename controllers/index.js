const express = require('express');

const { userRouter } = require('./user.js');
const { achievementRouter } = require('./achievement.js');

const apiRouter = express.Router();

apiRouter.use('/api/user', userRouter);
apiRouter.use('/api/achievement', achievementRouter);

module.exports = { apiRouter };