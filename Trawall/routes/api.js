var express = require('express');
var session = require('client-sessions');
// var pg = require('pg');

var router = express.Router();

var connect = "postgres://luan:lzn19940830@localhost/trawall"; // explicitely put pw here?

// User API
// verify if the user in the db
router.post('/user/login', function (req, res, next) {
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
router.post('/user/register', function (req, res, next) {
        return res.redirect('http://localhost:3000/login');
});





// Post API
// posts with pagination
router.get('/post/:offset?/:limit?', function(req, res, next) {
        return res.json({
                posts: [
                        {'id': '111',
                        'username': 'FrogLuan',
                        'profilePic': 'A',
                        'format': '1',
                        'content': 'Yosemite is beautiful! I love nature!',
                        'location': 'Yosemite, CA',
                        'tags': ['yosemite', 'camping', 'nature']},

                        {'id': '222',
                        'username': 'Jenny',
                        'profilePic': 'B',
                        'format': '1',
                        'content': 'Love the beach at Laguna!',
                        'location': 'Laguna Beach, CA',
                        'tags': ['laguna', 'beach', 'road-trip', 'nature']},

                        {'id': '333',
                        'username': 'AwesomeMe',
                        'profilePic': 'C',
                        'format': '1',
                        'content': 'NYC or LA?',
                        'location': 'New York, NY',
                        'tags': ['empire-state', 'night-life', 'city']}
                ]
        });
});





















// // pool shutdown
// pool.end()



module.exports = router;