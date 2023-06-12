const express = require('express');

const { userRouter } = require('./user.js');
const { gameRouter } = require('./game');
const { chatRouter } = require('./chat');

const apiRouter = express.Router();

apiRouter.use('/api/user', userRouter);
apiRouter.use('/api/game', gameRouter);
apiRouter.use('/api/chat', chatRouter);

module.exports = { apiRouter };