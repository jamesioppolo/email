const sendgrid = require("../MailingSystems/sendgrid");
const mailgun = require("../MailingSystems/mailgun");

module.exports = {
    send: (mailMessage, callback) => {
        let client1 = sendgrid;
        let client2 = mailgun;
        client1.send(mailMessage, (client1Response) => {
            if (client1Response.statusCode === 200) {
                callback(client1Response);        
            } else {
                client2.send(mailMessage, (client2Response) => {
                    if (client2Response.statusCode === 200) {
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