const sendgrid = require("../services/sendgrid");
const mailgun = require("../services/mailgun");
const EmailValidator  = require('../services/emailValidator');
var emailValidator = new EmailValidator;

class MailController {  
    isResponseOk(statusCode) {
        return statusCode === 200 || statusCode === 202;
    }

    send(mailMessage, callback) {
        const mailMessageValidity = emailValidator.validity(mailMessage);
        if (!mailMessageValidity.isValid) {
            callback({
                statusCode: 400,
                message: mailMessageValidity.message
            });
        } else {
            let client1 = sendgrid;
            let client2 = mailgun;
            client1.send(mailMessage, (client1Response) => {
                if (this.isResponseOk(client1Response.statusCode)) {
                    callback(client1Response);        
                } else {
                    client2.send(mailMessage, (client2Response) => {
                        client2Response.previousResponse = client1Response;
                        callback(client2Response);
                    });
                }
            });
        }
    }
}

module.exports = MailController;