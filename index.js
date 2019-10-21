const express = require("express");

const PORT = 8080;
const app = express();

var bodyParser = require('body-parser');
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies

const mailgun = require("mailgun-js");
const DOMAIN = 'sandbox319d2c2bcf8b4fcc8348836ddfb5d9d2.mailgun.org';
const mg = mailgun({apiKey: 'd0acd922f8e5b832cc844dcf503cb3c1-9c988ee3-0a6f7ecb', domain: DOMAIN});

app.listen(PORT, () => {
 console.log(`Server is listening on port: ${PORT}`);
});

app.post('/email', async (req, res) => {
    var recipients = req.body.recipients;
    var cc = req.body.cc;
    var bcc = req.body.bcc;
    var subject = req.body.subject;
    var message = req.body.message;
    var from = req.body.from;
    const data = {
        from: from,
        to: recipients,
        subject: subject,
        text: message
    };
    mg.messages().send(data, function (error, response) {
        if (error) {
            res.status(error.statusCode).send('Mailgun ' + error);
        } else {
            res.send(response);
        }                   
    });

});