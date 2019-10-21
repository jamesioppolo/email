
const express = require('express');
const PORT = 8080;
const app = express();
const bodyParser = require('body-parser');
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies

const mailController = require('./MailController/mailController');

app.listen(PORT, () => {
 console.log(`Server is listening on port: ${PORT}`);
});

app.post('/email', async (req, res) => {
    mailController.send(req.body, (response) => {
        if (response.statusCode === 200) {
            res.send(response);        
        } else {
            res.status(response.statusCode).send(response.message);
        }
    });
});