require('dotenv').config();
const express = require('express');
const MailController = require('./services/mailController');
var mailController = new MailController;

const app = express();
app.use(express.json());

// check for any bad json
app.use((err, req, res, next) => {
    console.error(err);
    if (err.status === 400) {
        return res.status(err.status).send(`Invalid JSON: ${err}`);
    }
    return next(err);
});

var server = app.listen(process.env.PORT, () => {
    console.log(`Server is listening on port: ${process.env.PORT}`);
});

app.post('/email', async (req, res) => {
    const response = await mailController.send(req.body);
    res.status(response.statusCode).send(response);
});

module.exports = server;