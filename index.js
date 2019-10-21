
import { send } from "./MailController/mailController";
import express from "express";
const PORT = 8080;
const app = express();
import { json, urlencoded } from 'body-parser';
app.use(json()); // support json encoded bodies
app.use(urlencoded({ extended: true })); // support encoded bodies

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
    if (bcc && bcc != '') {
        data.bcc = bcc;
    }
    send(data, (response) => {
        if (response.statusCode === 200) {
            res.send(response);        
        } else {
            res.status(response.statusCode).send(response.message);
        }
    });
});