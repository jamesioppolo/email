const SendgridService = require('../../services/SendgridService');
const sendgridService = new SendgridService();
const sinon = require('sinon');
const assert = require('assert');

describe('Sendgrid Service', () => {
    const mailMessage = {
        from: 'from@mail.com',
        to: ['to@mail.com'],
        subject: 'test subject',
        text: 'test message'
    };

    afterEach(() => {
        sinon.restore();
    });

    it('calls endpoint with correct parameters', async () => {
        sinon.stub(sendgridService, 'callSendgrid').callsFake(() => {
            return { statusCode: 200 };
        });
        var response = await sendgridService.send(mailMessage);
        assert.equal(response.statusCode, 200);
        sinon.assert.calledWith(sendgridService.callSendgrid, sinon.match.has('method', 'POST'));
        sinon.assert.calledWith(sendgridService.callSendgrid, sinon.match.has('url', 'https://api.sendgrid.com/v3/mail/send'));
        sinon.assert.calledWith(sendgridService.callSendgrid, sinon.match.has('body', '{"personalizations":[{"to":[{"email":"to@mail.com"}]}],"from":{"email":"from@mail.com"},"subject":"test subject","content":[{"type":"text/plain","value":"test message"}]}'));

    });
});