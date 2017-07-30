var express = require('express');
var session = require('client-sessions');
// var pg = require('pg');

var router = express.Router();

var connect = "postgres://luan:lzn19940830@localhost/trawall"; // explicitely put pw here?

// verify if the user in the db
router.post('/login', function (req, res, next) {
        // pg.connect(connect, function (err, client, done) {
        //         if (err) {
        //                 return console.error("error!", err);
        //         }
        //         client.query(`SELECT * FROM Trawall_Users;`, function (err, result) {
        //                 if (err) {
        //                         return console.error("err");
        //                 }
        //                 return res.json({ users: result });
        //         });
        //         done();
        // });
        // connection using created pool

        // pool.connect(function (err, client, done) {
        //         client.query(`SELECT * FROM Trawall_Users`, function (err, result) {
        //                 if (err) {
        //                         return console.error("err");
        //                 }
        //                 return res.json({ users: result });
        //         }); done()
        // })
        // return res.json({ status: 200 });
        req.session.username = "FrogLuan"; // dummy data
        return res.redirect('http://localhost:3000/dashboard');
});

// register
router.post('/register', function (req, res, next) {
        return res.redirect('http://localhost:3000/login');
});


// // pool shutdown
// pool.end()



module.exports = router;