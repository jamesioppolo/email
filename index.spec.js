let chai = require('chai');
let chaiHttp = require('chai-http');
chai.use(chaiHttp);
let app = require('./index');
let sinon = require('sinon');
var assert = require('assert');
const mailController = require('./MailController/mailController');

describe('email route', () => {

    afterEach(() => {
        sinon.restore();
    });

    it('sends email OK', (done) => {
        sinon.stub(mailController, 'send').callsFake((body, callback) => {
            callback({
                statusCode: 200,
                message: 'ok'
            });
        });
        const email = {
            recipients: 'abc123@mail.com'
        }
        chai.request(app)
            .post('/email')
            .send(email)
            .end((err, res) => {
                assert.equal(res.statusCode, 200);
                done();
            });
    });

    it('sends fail code', (done) => {
        sinon.stub(mailController, 'send').callsFake((body, callback) => {
            callback({
                statusCode: 500,
                message: 'bad request'
            });
        });
        const email = {
            recipients: 'abc123@mail.com'
        }
        chai.request(app)
            .post('/email')
            .send(email)
            .end((err, res) => {
                assert.equal(res.statusCode, 500);
                done();
            });
    });
});
