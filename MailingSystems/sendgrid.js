
// using Twilio SendGrid's v3 Node.js Library
// https://github.com/sendgrid/sendgrid-nodejs
const sgMail = require('@sendgrid/mail');
sgMail.setApiKey('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');

module.exports = {
    send: (mailMessage, callback) => {
        sgMail.send(mailMessage).then((response) => {
            callback({
                statusCode: 200,
                message: {
                    system: 'Sendgrid',
                    response: response
                }
            });
        }).catch((error) => {
            callback({
                statusCode: error.code,
                message: {
                    system: 'Sendgrid',
                    response: error.message
                }
            });
        });
    }
};