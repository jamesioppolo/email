const mailgun = require("./MailingSystems/mailgun");
const sendgrid = require("./MailingSystems/sendgrid");
const express = require("express");
const PORT = 8080;
const app = express();
var bodyParser = require('body-parser');
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies

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
    if (cc && cc != '') {
        data.cc = cc;
    }
    if (bcc & cc != '') {
        data.bcc = bcc;
    }
    sendgrid.send(data, (response) => {
        if (response.statusCode === 200) {
            res.send(response);        
        } else {
            res.status(response.statusCode).send(response.message);
        }
    });
    // mailgun.send(data, (response) => {
    //     if (response.statusCode === 200) {
    //         res.send(response.message);
    //     } else {
    //         res.status(response.statusCode).send(response.message);
    //     }
    // });
});