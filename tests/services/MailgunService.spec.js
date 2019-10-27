const MailgunService = require('../../services/MailgunService');
const mailgunService = new MailgunService();
const sinon = require('sinon');
const assert = require('assert');

describe('Mailgun Service', () => {
    const mailMessage = {
        from: 'from@mail.com',
        to: ['to@mail.com'],
        subject: 'test subject',
        text: 'test message'
    };

    afterEach(() => {
        sinon.restore();
    });

    it('calls endpoint with correct form data', async () => {
        sinon.stub(mailgunService, 'callMailgun').callsFake(() => {
            return { statusCode: 200 };
        });
        var response = await mailgunService.send(mailMessage);
        assert.equal(response.statusCode, 200);
        sinon.assert.calledWith(mailgunService.callMailgun, sinon.match.has('method', 'POST'));
        sinon.assert.calledWith(mailgunService.callMailgun, sinon.match.has('form', {
            bcc: [],
            cc: [],
            from: "from@mail.com",
            subject: "test subject",
            text: "test message",
            to: ["to@mail.com"]
        }));
    });
});