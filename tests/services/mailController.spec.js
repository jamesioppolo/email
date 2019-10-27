const MailController = require('../../services/MailController');
var mailController = new MailController();
const SendgridService = require("../../services/SendgridService");
const MailgunService = require("../../services/MailgunService");
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
        sinon.stub(SendgridService.prototype, 'send').callsFake(async body => {
            return { statusCode: 200, message: 'ok from sendGrid' };
        });

        mailController.send(mailMessage, (response) => {
            assert.equal(response.statusCode, 200);
            assert.equal(response.message, 'ok from sendGrid');
        });
    });

    it('fails over from sendGrid to mailGun', () => {
        sinon.stub(SendgridService.prototype, 'send').callsFake(async body => {
            return { statusCode: 500, message: 'bad code from sendGrid' };
        });
        sinon.stub(MailgunService.prototype, 'send').callsFake(async body => {
            return { statusCode: 200, message: 'ok from mailgun' };
        });
        mailController.send(mailMessage, (response) => {
            assert.equal(response.statusCode, 200);
            assert.equal(response.message, 'ok from mailgun');
        });
    });

    it('returns both error messages when both sendGrid and mailGun are down', () => {
        sinon.stub(SendgridService.prototype, 'send').callsFake(async body => {
            return { statusCode: 500, message: 'bad code from sendGrid' };
        });
        sinon.stub(MailgunService.prototype, 'send').callsFake(async body => {
            return { statusCode: 500, message: 'bad code from mailgun' };
        });
        mailController.send(mailMessage, (response) => {
            assert.equal(response.statusCode, 500);
            assert.equal(response.message, 'bad code from mailgun');
            assert.equal(response.previousResponse.message, 'bad code from sendGrid');
        });
    });
});