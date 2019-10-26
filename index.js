require('dotenv').config();
const express = require('express');
const mailController = require('./services/mailController');

const app = express();
app.use(express.json());

var server = app.listen(process.env.PORT, () => {
 console.log(`Server is listening on port: ${process.env.PORT}`);
});

app.post('/email', async (req, res) => {
    mailController.send(req.body, (response) => {
        res.status(response.statusCode).send(response);
    });
});

module.exports = server;