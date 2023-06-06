const express = require('express');

const { userRouter } = require('./user.js');
const { gameRouter } = require('./game');

const apiRouter = express.Router();

apiRouter.use('/api/user', userRouter);
apiRouter.use('/api/game', gameRouter);

module.exports = { apiRouter };