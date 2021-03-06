const SendgridService = require('../services/SendgridService');
const sendgridService = new SendgridService;
const MailgunService = require('../services/MailgunService');
const mailgunService = new MailgunService;
const EmailValidator = require('./EmailValidator');
const emailValidator = new EmailValidator;

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
                message: "Invalid message",
                error: emailMessageValidity.message
            };
        } else {
            let client1 = sendgridService;
            let client2 = mailgunService;
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
