const sendgrid = require("../services/sendgrid");
const mailgun = require("../services/mailgun");

function isResponseOk(statusCode) {
    return statusCode === 200 || statusCode === 202;
}

module.exports = {
    send: (mailMessage, callback) => {
        let client1 = sendgrid;
        let client2 = mailgun;
        client1.send(mailMessage, (client1Response) => {
            if (isResponseOk(client1Response.statusCode)) {
                callback(client1Response);        
            } else {
                client2.send(mailMessage, (client2Response) => {
                     client2Response.previousResponse = client1Response;
                     callback(client2Response);
                });
            }
        });
    }
};