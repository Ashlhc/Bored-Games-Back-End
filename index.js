const express = require('express');
const sequelize = require('./config/connection');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require('socket.io');

const { apiRouter } = require('./controllers');

const PORT = process.env.PORT || 3000;

const io = new Server(server, {
    cors: {
        origin: function(origin, callback){
          if(isValidOrigin(origin)){
            callback(null, true);
          } else{
            callback(new Error('Not allowed by CORS'));
          }
        },
        methods: ['GET', 'POST', 'DELETE', 'OPTIONS'],
    },
});

function isValidOrigin(origin) {
  return origin && (origin.includes('wellington-j-gallowsby-hangman.netlify.app') || origin.includes('localhost'));
}

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

app.use((req, res, next) => {
  const origin = req.headers.origin;
  if (isValidOrigin(origin)) {
    res.setHeader('Access-Control-Allow-Origin', origin);
  }
  res.setHeader("Access-Control-Allow-Credentials", "true");
  res.setHeader("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
  res.setHeader("Access-Control-Allow-Headers", "Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers");
  next();
});

app.use(apiRouter);

sequelize.sync().then(() => {
    server.listen(PORT, () => {
        console.log(`listening on port ${PORT}`);
    })
});
