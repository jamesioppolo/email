var validator = require('validator');

class EmailValidator {

    validity(mailMessage) {
        if (!mailMessage) {
            return {
                isValid: false, message: 'Invalid mail message'
            };
        }

        // 'to' checks
        if (!mailMessage.to) {
            return {
                isValid: false, message: 'Missing \'to\' parameter'
            };
        }

        if(mailMessage.to.length === 0) {
            return {
                isValid: false, message: 'Invalid \'to\' parameter. Should be an array of strings'
            };
        }

        for (const emailAddress of mailMessage.to) {
            if (!validator.isEmail(emailAddress)) {
                return {
                    isValid: false, message: `Invalid email '${emailAddress}' in 'to' parameter list`
                }
            }
        }

        // 'cc' checks
        if (mailMessage.cc) {
            for (const emailAddress of mailMessage.cc) {
                if (!validator.isEmail(emailAddress)) {
                    return {
                        isValid: false, message: `Invalid email '${emailAddress}' in 'cc' parameter list`
                    }
                }
            }
        }

        // 'bcc' checks
        if (mailMessage.bcc) {
            for (const emailAddress of mailMessage.bcc) {
                if (!validator.isEmail(emailAddress)) {
                    return {
                        isValid: false, message: `Invalid email '${emailAddress}' in 'bcc' parameter list`
                    }
                }
            }
        }

        // 'from' checks
        if (!mailMessage.from) {
            return {
                isValid: false, message: 'Missing \'from\' parameter'
            };
        }

        // 'subject' checks
        if (!mailMessage.subject) {
            return {
                isValid: false, message: 'Missing \'subject\' parameter'
            };
        }

        // 'text' checks
        if (!mailMessage.text) {
            return {
                isValid: false, message: 'Missing \'text\' parameter'
            };
        }

        return {
            isValid: true,
            message: 'OK'
        };
    }
}

module.exports = EmailValidator;
