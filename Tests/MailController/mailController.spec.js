const mailController = require('../../MailController/mailController');
const sendgrid = require("../../MailingSystems/sendgrid");
const mailgun = require("../../MailingSystems/mailgun");
const sinon = require('sinon');
const assert = require('assert');

describe('Mail Controller', () => {

    const mailMessage = {
        from: 'from@mail.com',
        to: ['to@mail.com'],
        subject: 'test subject',
        text: 'test message'
    };

    afterEach(() => {
        sinon.restore();
    });

    it('calls sendgrid first', () => {
        sinon.stub(sendgrid, 'send').callsFake((body, callback) => {
            callback({statusCode: 200, message: 'ok from sendGrid'});
        });

        mailController.send(mailMessage, (response) => {
            assert.equal(response.statusCode, 200);
            assert.equal(response.message, 'ok from sendGrid');
        });
    });

    it('fails over from sendGrid to mailGun', () => {
        sinon.stub(sendgrid, 'send').callsFake((body, callback) => {
            callback({statusCode: 500, message: 'bad code from sendGrid'});
        });
        sinon.stub(mailgun, 'send').callsFake((body, callback) => {
            callback({statusCode: 200, message: 'ok from mailgun'});
        });
        mailController.send(mailMessage, (response) => {
            assert.equal(response.statusCode, 200);
            assert.equal(response.message, 'ok from mailgun');
        });
    });

    it('returns two error messages when both sendGrid and mailGun are down', () => {
        sinon.stub(sendgrid, 'send').callsFake((body, callback) => {
            callback({statusCode: 500, message: 'bad code from sendGrid'});
        });
        sinon.stub(mailgun, 'send').callsFake((body, callback) => {
            callback({statusCode: 500, message: 'bad code from mailgun'});
        });
        mailController.send(mailMessage, (response) => {
            assert.equal(response.client1Response.statusCode, 500);
            assert.equal(response.client1Response.message, 'bad code from sendGrid');
            assert.equal(response.client2Response.statusCode, 500);
            assert.equal(response.client2Response.message, 'bad code from mailgun');
        });
    });
});