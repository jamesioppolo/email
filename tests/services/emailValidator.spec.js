const assert = require('assert');
const EmailValidator  = require('../../services/emailValidator');
var emailValidator = new EmailValidator;

describe('Email Validator', () => {

    it('handles invalid mail message', () => {
        const result = emailValidator.validity(null);
        assert.equal(result.isValid, false);
        assert.equal(result.message, 'Invalid mail message');
    });

    it('handles missing \'to\' parameter', () => {
        const result = emailValidator.validity({from:'blah@blah.com', text: 'text', subject: 'subject'});
        assert.equal(result.isValid, false);
        assert.equal(result.message, 'Missing \'to\' parameter');
    });

    it('handles missing \'to\' parameter, for zero length', () => {
        const result = emailValidator.validity({to: [], from:'blah@blah.com', text: 'text', subject: 'subject'});
        assert.equal(result.isValid, false);
        assert.equal(result.message, 'Invalid \'to\' parameter. Should be an array of strings');
    });

    it('handles bad email in \'to\' parameter list', () => {
        const result = emailValidator.validity({to: ['bademail'], from:'blah@blah.com', text: 'text', subject: 'subject'});
        assert.equal(result.isValid, false);
        assert.equal(result.message, 'Invalid email \'bademail\' in \'to\' parameter list');
    });

    it('handles bad email in optional \'cc\' parameter list', () => {
        const result = emailValidator.validity({to: ['good@email.com'], cc: ['bademail'], from:'blah@blah.com', text: 'text', subject: 'subject'});
        assert.equal(result.isValid, false);
        assert.equal(result.message, 'Invalid email \'bademail\' in \'cc\' parameter list');
    });

    it('handles bad email in optional \'bcc\' parameter list', () => {
        const result = emailValidator.validity({to: ['good@email.com'], bcc: ['bademail'], from:'blah@blah.com', text: 'text', subject: 'subject'});
        assert.equal(result.isValid, false);
        assert.equal(result.message, 'Invalid email \'bademail\' in \'bcc\' parameter list');
    });

    it('handles missing \'from\' parameter', () => {
        const result = emailValidator.validity({to:['blah@blah.com'], text: 'text', subject: 'subject'});
        assert.equal(result.isValid, false);
        assert.equal(result.message, 'Missing \'from\' parameter');
    });

    it('handles missing \'subject\' parameter', () => {
        const result = emailValidator.validity({to:['blah@blah.com'], text: 'text', from: 'subject'});
        assert.equal(result.isValid, false);
        assert.equal(result.message, 'Missing \'subject\' parameter');
    });

    it('handles missing \'text\' parameter', () => {
        const result = emailValidator.validity({to:['blah@blah.com'], from: 'from@from.com', subject: 'subject'});
        assert.equal(result.isValid, false);
        assert.equal(result.message, 'Missing \'text\' parameter');
    });


});
