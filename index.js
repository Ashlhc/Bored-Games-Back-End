const express = require('express');
const sequelize = require('./config/connection');

const app = express();

const { apiRouter } = require('./controllers');

const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(apiRouter);

app.use((_, res, next) => {
    res.header("Access-Control-Allow-Origin", '*');
    res.header("Access-Control-Allow-Credentials", true);
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
    res.header("Access-Control-Allow-Headers", 'Origin,X-Requested-With,Content-Type,Accept,content-type,application/json');
    next();
});

sequelize.sync().then(() => {
    app.listen(PORT, () => {
        console.log(`App listening on port ${PORT}`);
    });
});
