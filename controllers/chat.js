const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require('socket.io');

// const io = new Server(server, {
//     cors: {
//         methods: ['GET', 'POST'],
//     },
// });
const chatRouter = express.Router();


// io.on('connection', (socket) => {
//     console.log(`a user connected: ${socket.id}`);
//     socket.on('send_message', (msg) => {
//         socket.broadcast.emit('receive_message', msg);
//         console.log(msg);
//     });
//     socket.on('disconnect', () => {
//         console.log(`user disconnected: ${socket.id}`);
//     })
// });

// server.listen(8001, () => {
//   console.log(`listening on *:${process.env.PORT || 'panic'}`);
// });

module.exports = { chatRouter };