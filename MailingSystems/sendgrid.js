const request = require('request');
const emailValidator = require("email-validator");

function getPersonalizationsFor(mailAddresses) {
    var emailList = [];
    if (mailAddresses) {
        var mailAddressStrings = mailAddresses.split(',');
        mailAddressStrings.forEach(mailAddress => {
            var croppedMailAddress = mailAddress.trim();
            if (emailValidator.validate(croppedMailAddress)) {
                emailList.push({ 'email': croppedMailAddress });
            }
        });
    }
    return emailList;
}

function getBodyFor(mailMessage) {
    var dataString = {
        'personalizations': [
            {
                'to': getPersonalizationsFor(mailMessage.to)
            }
        ],
        'from': {
            'email': mailMessage.from
        },
        'subject': mailMessage.subject,
        'content': [
            {
                'type': 'text/plain',
                'value': mailMessage.text
            }
        ]
    };
    if (mailMessage.cc && mailMessage.cc !== '') {
        dataString.personalizations.cc = getPersonalizationsFor(mailMessage.cc);
    }
    if (mailMessage.bcc && mailMessage.bcc !== '') {
        dataString.personalizations.bcc = getPersonalizationsFor(mailMessage.bcc);
    }
    return JSON.stringify(dataString);
}

module.exports = {
    send: (mailMessage, callback) => {

        var headers = {
            'Authorization': `Bearer ${process.env.SENDGRID_API_KEY}`,
            'Content-Type': 'application/json'
        };
        var options = {
            url: 'https://api.sendgrid.com/v3/mail/send',
            method: 'POST',
            headers: headers,
            body: getBodyFor(mailMessage)
        };
        request(options, (err, res) => {
            callback({
                system: 'SendGrid',
                statusCode: res.statusCode,
                response: res.headers,
                error: err
            });
        });
    }
};
