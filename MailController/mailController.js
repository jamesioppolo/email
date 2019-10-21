const mailgun = require("../MailingSystems/mailgun");
const sendgrid = require("../MailingSystems/sendgrid");

module.exports = {
    send: (mailMessage, callback) => {
        let client1, client2;
        if (Math.random() < 0.5) {
            client1 = mailgun;
            client2 = sendgrid;
        } else {
            client1 = sendgrid;
            client2 = mailgun;
        }
        client1.send(mailMessage, (client1Response) => {
            if (client1Response.statusCode === 200) {
                callback(client1Response);        
            } else {
                client2.send(mailMessage, (client2Response) => {
                    if (client2Response.statusCode === 200) {
                        callback(client2Response);
                    } else {
                        callback({
                            client1Response,
                            client2Response
                        });
                    }
                });
            }
        });
    }
};