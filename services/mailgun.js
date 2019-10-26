const request = require('request');
const emailValidator = require("email-validator");

function addFormDataFrom(mailList, type, form) {
    form[type] = [];
    if (mailList) {
        const mailAddresses = mailList.split(',');
        mailAddresses.forEach(mailAddress => {
            const trimmedMailAddress = mailAddress.trim();
            if (emailValidator.validate(trimmedMailAddress)) {
                form[type].push(trimmedMailAddress);
            } 
        });
    }
    return form;
}

module.exports = {
    send: (mailMessage, callback) => {

        var form = {
            'from': mailMessage.from,
            'subject': mailMessage.subject,
            'text': mailMessage.text
        };

        form = addFormDataFrom(mailMessage.to, 'to', form);
        form = addFormDataFrom(mailMessage.cc, 'cc', form);
        form = addFormDataFrom(mailMessage.bcc, 'bcc', form);

        const options = {
            url: `https://api.mailgun.net/v3/${process.env.MAILGUN_DOMAIN}/messages`,
            auth: {
                'user': 'api',
                'pass': process.env.MAILGUN_API_KEY
            },
            form: form,
            method: 'POST'
        }
        request.post(options, (err, res) => {     
            callback({
                system: "MailGun",
                statusCode: res.statusCode,
                message: res.body,
                error: err
            });
        });
    }
        
};