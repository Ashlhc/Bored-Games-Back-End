const express = require('express');
const { userRouter } = require('./user.js');
const apiRouter = express.Router();

apiRouter.use('/api/user', userRouter);

module.exports = { apiRouter };