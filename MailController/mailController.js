const sendgrid = require("../MailingSystems/sendgrid");
const mailgun = require("../MailingSystems/mailgun");

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
                    if (isResponseOk(client2Response.statusCode)) {
                        client2Response.previousResponse = client1Response;
                        callback(client2Response);
                    } else {
                        client2Response.previousResponse = client1Response;
                        callback(client2Response);
                    }
                });
            }
        });
    }
};