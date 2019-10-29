process.env.NODE_ENV = 'test';
const expect = require('chai').expect;
const request = require('supertest');

const app = require('../index');
const conn = require('../db_index');

describe('POST /user/', () => {

    before((done) => {
        conn.connect()
            .then(() => done())
            .catch((err) => done(err));
    });

    after((done) => {
        conn.close()
            .then(() => done())
            .catch((err) => done(err));
    });

    it('Ok, creating a new user', (done) => {
        request(app).post('/user/')
            .send({ dni: 35262728, name: "Test", password: "testeando", email: "test@test.com" })
            .then((res) => {
                const body = res.body;
                expect(body).to.contain.property('id');
                expect(body).to.contain.property('dni');
                expect(body).to.contain.property('name');
                expect(body).to.contain.property('password');
                expect(body).to.contain.property('email');
                expect(body).to.contain.property('date');
                return done();
            }).catch((err) => done(err));
    });

    it('Fail, user requires dni', (done) => {
        request(app).post('/user/')
            .send({ name: "Test", password: "testeando", email: "test@test.com" })
            .then((res) => {
                const body = res.body;
                expect(body.message).to.equal('User validation failed: dni: The DNI is required');
                return done();
            }).catch((err) => done(err));
    });
})