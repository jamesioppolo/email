const mailgun = require("../MailingSystems/mailgun");
const sendgrid = require("../MailingSystems/sendgrid");

module.exports = {
    send: (body, callback) => {
        const mailMessage = {
            from: body.from,
            to: body.recipients,
            subject: body.subject,
            text: body.message
        };
        if (body.cc && body.cc != '') {
            mailMessage.cc = body.cc;
        }
        if (body.bcc && body.bcc != '') {
            mailMessage.bcc = body.bcc;
        }

        let client1 = sendgrid;
        let client2 = mailgun;
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