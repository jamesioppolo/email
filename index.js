require('dotenv').config();
const express = require('express');
const PORT = 8080;
const app = express();
const bodyParser = require('body-parser');
app.use(bodyParser.json()); // support json encoded bodies


const mailController = require('./services/mailController');

var server = app.listen(PORT, () => {
 console.log(`Server is listening on port: ${PORT}`);
});

app.post('/email', async (req, res) => {
    mailController.send(req.body, (response) => {
        res.status(response.statusCode).send(response);
    });
});

module.exports = server;