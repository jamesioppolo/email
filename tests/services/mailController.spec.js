const MailController = require('../../services/mailController');
var mailController = new MailController();
const Sendgrid = require("../../services/sendgrid");
const Mailgun = require("../../services/mailgun");
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
        sinon.stub(Sendgrid.prototype, 'send').callsFake(async body => {
            return { statusCode: 200, message: 'ok from sendGrid' };
        });

        mailController.send(mailMessage, (response) => {
            assert.equal(response.statusCode, 200);
            assert.equal(response.message, 'ok from sendGrid');
        });
    });

    it('fails over from sendGrid to mailGun', () => {
        sinon.stub(Sendgrid.prototype, 'send').callsFake(async body => {
            return { statusCode: 500, message: 'bad code from sendGrid' };
        });
        sinon.stub(Mailgun.prototype, 'send').callsFake(async body => {
            return { statusCode: 200, message: 'ok from mailgun' };
        });
        mailController.send(mailMessage, (response) => {
            assert.equal(response.statusCode, 200);
            assert.equal(response.message, 'ok from mailgun');
        });
    });

    it('returns both error messages when both sendGrid and mailGun are down', () => {
        sinon.stub(Sendgrid.prototype, 'send').callsFake(async body => {
            return { statusCode: 500, message: 'bad code from sendGrid' };
        });
        sinon.stub(Mailgun.prototype, 'send').callsFake(async body => {
            return { statusCode: 500, message: 'bad code from mailgun' };
        });
        mailController.send(mailMessage, (response) => {
            assert.equal(response.statusCode, 500);
            assert.equal(response.message, 'bad code from mailgun');
            assert.equal(response.previousResponse.message, 'bad code from sendGrid');
        });
    });
});