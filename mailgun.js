const mailgun = require("mailgun-js");
const DOMAIN = 'sandbox319d2c2bcf8b4fcc8348836ddfb5d9d2.mailgun.org';
const mg = mailgun({apiKey: 'd0acd922f8e5b832cc844dcf503cb3c1-9c988ee3-0a6f7ecb', domain: DOMAIN});

module.exports = {
    send: (mailMessage, callback)  => {
        mg.messages().send(mailMessage, function (error, response) {
            if (error) {
                callback({
                    statusCode: 500,
                    message: 'Mailgun ' + error
                });
                
            } else {
                callback({ 
                    statusCode: 200, 
                    message: {
                        system: 'Mailgun',
                        resonse: response
                    }
                });
            }                   
        });
    }
};