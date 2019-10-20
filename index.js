const express = require("express");

const PORT = 1234;
const app = express();

var bodyParser = require('body-parser');
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies

app.listen(PORT, () => {
 console.log(`Server is listening on port: ${PORT}`);
});

app.get("/hello", async (req, res) => {
    res.send('hello');
});

app.post('/email', async (req, res) => {
    var recipients = req.body.recipients;
    var cc = req.body.cc;
    var bcc = req.body.bcc;
    var subject = req.body.subject;
    var message = req.body.message;
    console.log('message=' + message);
    res.send(message);
});