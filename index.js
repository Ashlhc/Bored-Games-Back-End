const express = require('express');
const cors = require('cors');
const sequelize = require('./config/connection');
const app = express();
const http = require('http');
const { Server } = require('socket.io');
const server = http.createServer(app);





const { apiRouter } = require('./controllers');

const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(cors());
app.use(apiRouter);

sequelize.sync().then(() => {
    server.listen(PORT, () => {
        console.log(`listening on port ${PORT}`);
    })
});
