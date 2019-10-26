const request = require('request');

class Sendgrid {

    getPersonalizationsFor(mailAddresses) {
        var emailList = [];
        if (mailAddresses) {
            mailAddresses.forEach(mailAddress => {
                emailList.push({ 'email': mailAddress });
            });
        }
        return emailList;
    }

    send(mailMessage, callback) {
        var dataString = {
            "personalizations": [
                { 
                    "to": this.getPersonalizationsFor(mailMessage.to) 
                }
            ],
            "from": {
                "email": mailMessage.from
            },
            "subject": mailMessage.subject,
            "content": [
                {
                    "type": "text/plain", 
                    "value": mailMessage.text
                }
            ]
        };
        if (mailMessage.cc && mailMessage.cc !== "") {
            dataString.personalizations.cc = this.getPersonalizationsFor(mailMessage.cc);
        }
        if (mailMessage.bcc && mailMessage.bcc !== "") {
            dataString.personalizations.bcc = this.getPersonalizationsFor(mailMessage.bcc);
        }

        var headers = {
            'Authorization': `Bearer ${process.env.SENDGRID_API_KEY}`,
            'Content-Type': 'application/json'
        };
        var options = {
            url: 'https://api.sendgrid.com/v3/mail/send',
            method: 'POST',
            headers: headers,
            body: JSON.stringify(dataString)
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
}


module.exports = Sendgrid;