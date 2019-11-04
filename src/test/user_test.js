process.env.NODE_ENV = 'test';
const expect = require('chai').expect;
const request = require('supertest');
const User = require('../models/user');

const app = require('../index');
const conn = require('../db_index');

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

describe('POST /user/register', () => {

    it('Ok, creating a new user', (done) => {
        request(app).post('/user/register')
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
        request(app).post('/user/register')
            .send({ name: "Test", password: "testeando", email: "test@test.com" })
            .then((res) => {
                const body = res.body;
                expect(body.message).to.equal('User validation failed: dni: The DNI is required');
                return done();
            }).catch((err) => done(err));
    });

    it('Fail, user requires name', (done) => {
        request(app).post('/user/register')
            .send({ dni: 35262728, password: "testeando", email: "test@test.com" })
            .then((res) => {
                const body = res.body;
                expect(body.message).to.equal('User validation failed: name: The name is required');
                return done();
            }).catch((err) => done(err));
    });

    it('Fail, user requires password', (done) => {
        request(app).post('/user/register')
            .send({ dni: 35262728, name: "test", email: "test@test.com" })
            .then((res) => {
                const body = res.body;
                expect(body.message).to.equal('User validation failed: password: The password is required');
                return done();
            }).catch((err) => done(err));
    });
});

describe('POST /user/login', () => {

    before(async function() {
        const userLogin = new User({dni: 32323235, name: 'Login', password: 'login1234', email: 'login@email.com'});
        await userLogin.save();
    });

    it('Ok, login a user', (done) => {
        request(app).post('/user/login')
            .send({ email: 'login@email.com', password: 'login1234'})
            .then((res) => {
                const body = res.body;
                expect(body.message).to.equal(`The user Login is login correctly`);
                return done();
            }).catch((err) => done(err));
    });

    it('Fail, the user password does not correctly', (done) => {
        request(app).post('/user/login')
            .send({ email: "login@email.com", password: "asd1234" })
            .then((res) => {
                const body = res.body;
                expect(body.message).to.equal('This password is invalid');
                return done();
            }).catch((err) => done(err));
    });
});

describe('UPDATE /user/:id', () => {

    it('Ok, updated a user id 1', (done) => {
        request(app).put('/user/1')
            .send({ dni: 35262730, name: "Update", password: "updatedd", email: "upd@upd.com" })
            .then((res) => {
                const body = res.body;
                expect(body).to.have.property('dni').to.be.equal(35262730);
                expect(body).to.have.property('name').to.be.equal('Update');
                expect(body).to.have.property('password').to.be.equal('updatedd');
                expect(body).to.have.property('email').to.be.equal('upd@upd.com');
                return done();
            }).catch((err) => done(err));
    });
});

describe('DELETE /user/:id', () => {

    it('Ok, deleted a user id 1', (done) => {
        request(app).delete('/user/1')
            .then((res) => {
                const body = res.body
                expect(body.message).to.equal('35262730 is deleted');
                return done();
            }).catch((err) => done(err));
    });
});