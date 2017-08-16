var assert = require('assert');
var request = require('supertest');
var app = require('../app');
var pg = require('pg');
var connectionString = process.env.DATABASE_URL || "postgres://luan:postgresql-luan@localhost/trawall"; // explicitely put pw here?


describe('POST /api/user/login', function () {
        it('renders a new page when login success', function (done) {
                request(app).post('/api/user/login')
                        .send({
                                email: 'zhaonial@uci.edu',
                                password: '123'
                        })
                        .expect(200)
                        .end(function (err, res) {
                                done(err);
                        });
        });
});

describe('POST /api/user/register', function () {
        it('renders a new page when register success', function (done) {
                let testEmail = 'zhaonial@uci.edu';
                request(app).post('/api/user/register')
                        .send({
                                email: testEmail,
                                password: '123'
                        })
                        .expect(200)
                        .end(function (err, res) {
                                pg.connect(connectionString, function (err, client, done) {
                                        if (err) {
                                                return console.error("error!", err);
                                        }
                                        client.query(`DELETE FROM Trawall_Users WHERE email = ${testEmail};`, function (err, result) {
                                                if (err) return console.log("clear db failed");
                                        });
                                        done();
                                });
                                done(err);
                        });
        });
});