const request = require('request');

class SendgridService {

    getHeaders() {
        return {
            'Authorization': `Bearer ${process.env.SENDGRID_API_KEY}`,
            'Content-Type': 'application/json'
        }
    }

    getPersonalizationsFor(mailAddresses) {
        var emailList = [];
        if (mailAddresses) {
            mailAddresses.forEach(mailAddress => {
                emailList.push({ 'email': mailAddress });
            });
        }
        return emailList;
    }

    getDataString(mailMessage) {
        var dataString = {
            'personalizations': [
                {
                    'to': this.getPersonalizationsFor(mailMessage.to)
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
            dataString.personalizations.cc = this.getPersonalizationsFor(mailMessage.cc);
        }
        if (mailMessage.bcc && mailMessage.bcc !== '') {
            dataString.personalizations.bcc = this.getPersonalizationsFor(mailMessage.bcc);
        }
        return JSON.stringify(dataString);
    }

    getHttpOptions(mailMessage) {
        return {
            url: 'https://api.sendgrid.com/v3/mail/send',
            method: 'POST',
            headers: this.getHeaders(),
            body: this.getDataString(mailMessage)
        };
    }

    callSendgrid(options) {
        return new Promise(resolve => {
            request(options, (err, res) => {
                resolve({
                    statusCode: res.statusCode,
                    response: res.headers,
                    error: err
                });
            });
        });
    }

    async send(mailMessage) {
        var httpOptions = this.getHttpOptions(mailMessage);
        try {
            return await this.callSendgrid(httpOptions);
        } catch(error) {
            console.log(error); // use cloud logging instead
            return {
                statusCode: 500,
                response: "Check the logs",
                error: "Unknown error occured"
            }
        }         
    }
}

module.exports = SendgridService;
