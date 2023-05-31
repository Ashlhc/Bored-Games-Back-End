const express = require('express');
const app = express();

const { apiRouter } = require('./controllers');

const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(apiRouter);

app.listen(PORT, () => {
    console.log(`App listening on port ${PORT}`);
});