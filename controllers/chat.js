// const express = require('express');
// const app = express();
// const http = require('http');
// const server = http.createServer(app);
// const { Server } = require('socket.io');
// const io = new Server(server, {
//     cors: {
//         origin: 'http://localhost:3000',
//         methods: ['GET', 'POST'],
//     },
// });
// const chatRouter = express.Router();


// app.get('/chat', (req, res) => {
//     res.sendFile(__dirname + '/index.html');
// });

// io.on('connection', (socket) => {
//     console.log(`a user connected: ${socket.id}`);
//     socket.on('send_message', (msg) => {
//         socket.broadcast.emit('receive_message', msg);
//     });
//     socket.on('disconnect', () => {
//         console.log(`user disconnected: ${socket.id}`);
//     })
// });

// server.listen(3000, () => {
//   console.log('listening on *:3000');
// });

// module.exports = { chatRouter };