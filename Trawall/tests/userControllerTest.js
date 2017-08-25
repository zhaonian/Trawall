var chai = require('chai');
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