var express = require('express');
var session = require('client-sessions');
var pg = require('pg');
var bcrypt = require('bcrypt');
const uuidv1 = require('uuid/v1');

var router = express.Router();

var connectionString = process.env.DATABASE_URL || "postgres://luan:postgresql-luan@localhost/trawall"; // explicitely put pw here?

// TODO: Should I separate API files

// User API
// login
router.post('/api/user/login', function (req, res, next) {
        let email = req.body.email;
        let password = req.body.password;
        pg.connect(connectionString, function (err, client, done) {
                if (err) {
                        return console.error("error!", err);
                }
                client.query(`SELECT id, email, username, hash FROM Trawall_Users WHERE email = '${email}';`, function (err, result) {
                        if (err) {
                                res.render('error', { message: "Database Exception" });
                        }
                        if (result.rowCount === 1) {
                                if (!bcrypt.compareSync(req.body.password, result.rows[0].hash)) {
                                        res.render('error', { message: "Invalid Password." });
                                }
                                req.session.id = result.rows[0].id;
                                req.session.email = email;
                                req.session.username = result.rows[0].username;
                                res.render('dashboard', {
                                        title: 'Trawall',
                                        userId: req.session.id,
                                });
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
                        res.render('login', { title: 'Trawall' });
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
// get posts with pagination
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
                                        return res.render('error', { message: "Database Exception" });
                                }
                                return res.json({ posts: result });
                        });
                } else { // spcifies pagination
                        client.query(`SELECT * FROM posts LIMIT ${limit} OFFSET ${offset};`, function (err, result) {
                                if (err) {
                                        return res.render('error', { message: "Database Exception" });
                                }
                                return res.json({ posts: result });
                        });
                }
                done();
        });
});


// new post
router.post('/api/post/new', function (req, res, next) {
        let id = uuidv1();
        let username = req.session.username;
        let format = 1;
        let content = req.body.content;
        let location = req.body.location;
        let tags = req.body.tags;
        pg.connect(connectionString, function (err, client, done) {
                if (err) {
                        res.render('error', { message: "Database Exception" });
                }
                client.query(`INSERT INTO Posts VALUES('${id}', '${username}', ${format}, '${content}', '${location}', '${tags}')  RETURNING *;`, function (err, result) {
                        if (err) {
                                return res.render('error', { message: "Database Exception" });
                        }
                        return res.json({ post: result });
                });
                done();
        });
});


// delete a post
router.delete('/api/post/delete/:postId', function (req, res, next) {
        let postId = req.params.postId;
        pg.connect(connectionString, function (err, client, done) {
                if (err) {
                        res.render('error', { message: "Database Exception" });
                }
                client.query(`DELETE FROM Posts WHERE id = '${postId}';`, function (err, result) {
                        if (err) {
                                return res.render('error', { message: "Database Exception" });
                        }
                        return res.json({ post: result });
                });
                done();
        });
});


// like a post
router.post('/api/:userId/like/:postId', function (req, res, next) {
        let userId = req.params.userId;
        let postId = req.params.postId;
        pg.connect(connectionString, function (err, client, done) {
                if (err) {
                        res.render('error', { message: "Database Exception" });
                }
                client.query(`INSERT INTO Likes VALUES('${userId}', '${postId}');`, function (err, result) {
                        if (err) {
                                return res.render('error', { message: "Database Exception" });
                        }
                        return res.json({ status: 200 });
                });
                done();
        });
});

// unlike a post 
router.post('/api/:userId/unlike/:postId', function (req, res, next) {
        let userId = req.params.userId;
        let postId = req.params.postId;
        pg.connect(connectionString, function (err, client, done) {
                if (err) {
                        res.render('error', { message: "Database Exception" });
                }
                client.query(`DELETE FROM Likes WHERE userId = '${userId}' AND postId = '${postId}';`, function (err, result) {
                        if (err) {
                                return res.render('error', { message: "Database Exception" });
                        }
                        return res.json({ status: 200 });
                });
                done();
        });
});



// client.query(`SELECT postId FROM Likes WHERE userId = '${req.session.id}'`, function (err, result) {
//         if (err) {
//                 res.render('error', { message: "Database Exception" });
//         }
//         res.json({ likedPosts: result });
// });







module.exports = router;


