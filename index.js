const express = require('express');
const cors = require('cors');
const sequelize = require('./config/connection');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require('socket.io');

const io = new Server(server, {
    cors: {
        cors: 'http://localhost:3000',
        methods: ['GET', 'POST'],
    },
});

const { apiRouter } = require('./controllers');

const PORT = process.env.PORT;

io.on('connection', (socket) => {
    console.log(`a user connected: ${socket.id}`);
    socket.on('send_message', (message) => {
        io.emit('receive_message', message);
        console.log('message: ', message);
    });
    socket.on('disconnect', () => {
        console.log(`user disconnected: ${socket.id}`);
    })
});

app.use(express.json());
app.use(cors());
app.use(apiRouter);

sequelize.sync().then(() => {
    server.listen(PORT, () => {
        console.log(`listening on port ${PORT}`);
    })
});
