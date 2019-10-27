const Sendgrid = require("../services/sendgrid");
var sendgrid = new Sendgrid;
const Mailgun = require("../services/mailgun");
var mailgun = new Mailgun;
const EmailValidator = require('../services/emailValidator');
var emailValidator = new EmailValidator;

class MailController {
    isResponseOk(statusCode) {
        return statusCode === 200 || statusCode === 202;
    }

    async send(mailMessage) {
        var response;
        const mailMessageValidity = emailValidator.validity(mailMessage);
        if (!mailMessageValidity.isValid) {
            response = {
                statusCode: 400,
                message: mailMessageValidity.message
            };
        } else {
            let client1 = sendgrid;
            let client2 = mailgun;
            var client1Response = await client1.send(mailMessage);
            if (this.isResponseOk(client1Response.statusCode)) {
                response = client1Response;
            } else {
                var client2Response = await client2.send(mailMessage);
                client2Response.previousResponse = client1Response;
                response = client2Response;
            }
        }
        return response;
    }
}

module.exports = MailController;