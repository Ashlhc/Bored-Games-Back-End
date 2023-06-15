const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require('socket.io');

const chatRouter = express.Router();

module.exports = { chatRouter };