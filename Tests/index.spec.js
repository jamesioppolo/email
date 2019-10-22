const chai = require('chai');
const chaiHttp = require('chai-http');
chai.use(chaiHttp);
const server = require('../index');
const sinon = require('sinon');
const assert = require('assert');
const mailController = require('../MailController/mailController');

describe('Email system', () => {

    afterEach((done) => {
        sinon.restore();
        server.close();
        done();
    });

    it('sends return code when email(s) are sent OK', (done) => {
        sinon.stub(mailController, 'send').callsFake((body, callback) => {
            callback({
                statusCode: 200,
                message: 'ok'
            });
        });
        const email = {
            recipients: 'abc123@mail.com'
        }
        chai.request(server)
            .post('/email')
            .send(email)
            .end((err, res) => {
                assert.equal(res.statusCode, 200);
                done();
            });
    });

    it('sends fail code when any errors occur', (done) => {
        sinon.stub(mailController, 'send').callsFake((body, callback) => {
            callback({
                statusCode: 500,
                message: 'bad request'
            });
        });
        const email = {
            recipients: 'abc123@mail.com'
        }
        chai.request(server)
            .post('/email')
            .send(email)
            .end((err, res) => {
                assert.equal(res.statusCode, 500);
                done();
            });
    });
});
