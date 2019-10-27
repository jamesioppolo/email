require('dotenv').config();
const express = require('express');
const MailController = require('./services/MailController');
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
    try {
        const response = await mailController.send(req.body);
        res.status(response.statusCode).send(response);
    } catch(error) {
        console.log(error); // use a cloud logging system instead
        res.status(500).send(error);
    }

});

module.exports = server;