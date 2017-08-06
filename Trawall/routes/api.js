var express = require('express');
var session = require('client-sessions');
var pg = require('pg');
var bcrypt = require('bcrypt');
const uuidv1 = require('uuid/v1');

var router = express.Router();

var connectionString = process.env.DATABASE_URL || "postgres://luan:postgresql-luan@localhost/trawall"; // explicitely put pw here?

// User API
// login
router.post('/api/user/login', function (req, res, next) {
        let email = req.body.email;
        let password = req.body.password;
        pg.connect(connectionString, function (err, client, done) {
                if (err) {
                        return console.error("error!", err);
                }
                client.query(`SELECT username, hash FROM Trawall_Users WHERE email = '${email}';`, function (err, result) {
                        if (err) {
                                res.render('error', { message: "Database Exception" });
                        }
                        if (result.rowCount === 1) {
                                if (!bcrypt.compareSync(req.body.password, result.rows[0].hash)) {
                                        res.render('error', { message: "Invalid Password." });
                                }
                                req.session.email = email;
                                req.session.username = result.rows[0].username;
                                return res.redirect('/dashboard');
                        } else {
                                res.render('error', { message: "User with this email Not Found" });
                        }
                });
                done();
        });
});

// register
router.post('/api/user/register', function (req, res, next) {
        let email = req.body.email;
        pg.connect(connectionString, function (err, client, done) {
                if (err) {
                        res.render('error', { message: "Database Exception" });
                }
                client.query(`SELECT FROM Trawall_Users WHERE email = '${email}';`, function (err, result) {
                        if (err) {
                                res.render('error', { message: "Database Exception" });
                        }
                        if (result.rowCount === 1) {
                                res.render('error', { message: "User with same email already exists" });
                        }
                });
                let uuid = uuidv1();
                let hash = bcrypt.hashSync(req.body.password, 10);
                client.query(`INSERT INTO Trawall_Users VALUES('${uuid}', '${email}', '${hash}', null);`, function (err, result) {
                        if (err) {
                                res.render('error', { message: "Database Exception" });
                        }
                        return res.redirect('/login');
                });
                done();
        });
});

// forgot password
// router.post('/api/user/forgotpassword', function (req, res, next) {
//         var email = req.body.email;
//         pg.connect(connectionString, function (err, client, done) {
//                 if (err) {
//                         res.render('error', { message: "Database Exception" });
//                 }
//                 client.query(`SELECT FROM Trawall_Users WHERE email = '${email}';`, function (err, result) {
//                         if (err) {
//                                 res.render('error', { message: "Database Exception" });
//                         }
//                         if (result.rowCount === 1) {
//                                 res.render('error', { message: "User with same email already exists" });
//                         }
//                 });
//                 var uuid = uuidv1();
//                 var hash = bcrypt.hashSync(req.body.password, 10);
//                 client.query(`INSERT INTO Trawall_Users VALUES('${uuid}', '${email}', '${hash}', null);`, function (err, result) {
//                         if (err) {
//                                 res.render('error', { message: "Database Exception" });
//                         }
//                         return res.redirect('/login');
//                 });
//                 done();
//         });
// });



// Post API
// posts with pagination
router.get('/api/post/:offset?/:limit?', function (req, res, next) {
        var offset = req.params.offset;
        var limit = req.params.limit;
        pg.connect(connectionString, function (err, client, done) {
                if (err) {
                        res.render('error', { message: "Database Exception" });
                }
                if (typeof limit === 'undefined' || typeof offset === 'undefined') { // does not specify pagination
                        client.query(`SELECT * FROM posts;`, function (err, result) {
                                if (err) {
                                        return res.render('error', { message: " 1 Database Exception" });
                                }
                                return res.json({ posts: result });
                        });
                } else { // spcifies pagination
                        client.query(`SELECT * FROM posts LIMIT ${limit} OFFSET ${offset};`, function (err, result) {
                                if (err) {
                                        return res.render('error', { message: " 2 Database Exception" });
                                }
                                return res.json({ posts: result });
                        });
                }
                done();
        });


        // return res.json({
        //         posts: [
        //                 {
        //                         'id': '111',
        //                         'username': 'FrogLuan',
        //                         'profilePic': 'A',
        //                         'format': '1',
        //                         'content': 'Yosemite is beautiful! I love nature!',
        //                         'location': 'Yosemite, CA',
        //                         'tags': ['yosemite', 'camping', 'nature']
        //                 },

        //                 {
        //                         'id': '222',
        //                         'username': 'Jenny',
        //                         'profilePic': 'B',
        //                         'format': '1',
        //                         'content': 'Love the beach at Laguna!',
        //                         'location': 'Laguna Beach, CA',
        //                         'tags': ['laguna', 'beach', 'road-trip', 'nature']
        //                 },

        //                 {
        //                         'id': '333',
        //                         'username': 'AwesomeMe',
        //                         'profilePic': 'C',
        //                         'format': '1',
        //                         'content': 'NYC or LA?',
        //                         'location': 'New York, NY',
        //                         'tags': ['empire-state', 'night-life', 'city']
        //                 }
        //         ]
        // });
});
















module.exports = router;