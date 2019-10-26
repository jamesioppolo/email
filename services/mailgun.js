const request = require('request');

function addFormDataFrom(mailList, type, form) {
    form[type] = [];
    if (mailList) {
        mailList.forEach(mailAddress => {
            form[type].push(mailAddress);
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