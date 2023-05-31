const express = require('express');
const userRouter = express.Router();

// TODO: remove test route (just an example)
userRouter.get('/test', (req, res) => {
    return res.json({ name: 'test' });
});

module.exports = { userRouter };