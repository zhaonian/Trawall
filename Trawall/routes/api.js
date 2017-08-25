const express = require('express');
const session = require('client-sessions');
const pg = require('pg');
const bcrypt = require('bcrypt');
const uuidv1 = require('uuid/v1');
const nodemailer = require('nodemailer');
const multer = require('multer');
const io = require('../socketio');

var router = express.Router();
// var message_queues = new Map();


const connectionString = process.env.DATABASE_URL || "postgres://luan:postgresql-luan@localhost/trawall"; // explicitely put pw here?

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
                                return res.render('error', { message: "Database Exception" });
                        }
                        if (result.rowCount === 1) {
                                if (!bcrypt.compareSync(req.body.password, result.rows[0].hash)) {
                                        return res.render('error', { message: "Invalid Password." });
                                }
                                req.session.id = result.rows[0].id;
                                req.session.email = email;
                                req.session.username = result.rows[0].username;
                                return res.redirect('/dashboard')
                        } else {
                                return res.render('error', { message: "User with this email Not Found" });
                        }
                });
                done();
        });
});

// register
router.post('/api/user/register', function (req, res, next) {
        let email = req.body.email;
        let username = req.body.username;
        pg.connect(connectionString, function (err, client, done) {
                if (err) {
                        return res.render('error', { message: "Database Exception " + err });
                }
                client.query(`SELECT * FROM Trawall_Users WHERE email = '${email}';`, function (err, result) {
                        if (err) {
                                return res.render('error', { message: "Database Exception " + err });
                        }
                        if (result.rowCount === 1) {
                                return res.render('error', { message: "User with same email already exists" });
                        }
                });
                let uuid = uuidv1();
                let hash = bcrypt.hashSync(req.body.password, 10);
                client.query(`INSERT INTO Trawall_Users VALUES('${uuid}', '${email}', '${hash}', '${username}', null, null) RETURNING *;`, function (err, result) {
                        if (err) {
                                return res.render('error', { message: "Database Exception " + err });
                        }
                        req.session.id = uuid;
                        req.session.username = username;
                        req.session.email = email;
                        return res.redirect('/dashboard');
                });
                done();
        });
});

// send reset password link to user email
router.post('/api/user/send-reset-link', function (req, res, next) {
        let email = req.body.email;
        let recoveryToken = uuidv1();
        var transporter = nodemailer.createTransport({
                service: 'gmail',
                auth: {
                        user: 'frogluan@gmail.com',
                        pass: 'l,z,n.940830'
                }
        });

        var mailOptions = {
                from: 'Trawall Support Team',
                to: email,
                subject: 'Password Reset',
                html: `<p>Click <a href="http://localhost:3000/passwordReset/${email}/reset-password/${recoveryToken}">here</a> to reset your password</p>
                        <p>This link will expire in 30 minutes</p>`
        };

        transporter.sendMail(mailOptions, function (error, info) {
                if (error) {
                        console.log(error);
                } else {
                        console.log('Email sent: ' + info.response);
                }
        });
        pg.connect(connectionString, function (err, client, done) {
                if (err) {
                        return res.render('error', { message: "Database Exception" });
                }
                client.query(`UPDATE Trawall_Users SET recoveryToken = '${recoveryToken}' WHERE email = '${email}';`, function (err, result) {
                        if (err) {
                                return res.render('error', { message: "Database Exception" });
                        }
                });
                done();
        });
        return res.redirect('/login');
});


// reset password
router.post('/api/user/resetPassword', function (req, res, next) {
        let email = req.body.email;
        let password = req.body.password;
        pg.connect(connectionString, function (err, client, done) {
                if (err) {
                        return res.render('error', { message: "Database Exception" });
                }
                let hash = bcrypt.hashSync(password, 10);
                client.query(`UPDATE Trawall_Users SET hash = '${hash}', recoveryToken = null WHERE email = '${email}';`, function (err, result) {
                        if (err) {
                                return res.render('error', { message: "Database Exception" });
                        }
                        return res.redirect('/login');
                });
                done();
        });
});


// update username
router.post('/api/user/username/update', function (req, res, next) {
        let id = req.body.id;
        let username = req.body.username;
        console.log(username, "  -  ", id);
        pg.connect(connectionString, function (err, client, done) {
                if (err) {
                        return res.render('error', { message: "Database Exception" });
                }
                client.query(`UPDATE Trawall_Users SET username = '${username}' WHERE id = '${id}';`, function (err, result) {
                        if (err) {
                                return res.render('error', { message: "Database Exception" });
                        }
                        return res.json({ username: username });
                });
                done();
        });
});

// update profile pic
// profile pic upload setup
var profilePicStorage = multer.diskStorage({
        destination: function (req, file, cb) {
                cb(null, 'public/images/avatars/')
        },
        filename: function (req, file, cb) {
                cb(null, file.fieldname + '.jpeg')
        }
});

var uploadProfilePic = multer({ storage: profilePicStorage }).single('profilePic');

// profile pic
router.post('/api/user/profilePic/update', function (req, res, next) {
        uploadProfilePic(req, res, function (err) {
                if (err) {
                        return res.render('error', { message: "upload failed " + err });
                }
                console.log('file upload success');

                let filePath = req.file.path.substring(7);
                let id = req.body.id;
                pg.connect(connectionString, function (err, client, done) {
                        if (err) {
                                res.render('error', { message: "Database Exception" });
                        }
                        client.query(`UPDATE Trawall_Users SET profilePic = '${filePath}' WHERE id = '${id}';`, function (err, result) {
                                if (err) {
                                        return res.render('error', { message: "Database Exception " + err });
                                }
                                return res.json({ profilePic: filePath });
                        });
                        done();
                });
        });
});











// Post API
// get posts with pagination
router.get('/api/post/:offset?/:limit?', function (req, res, next) {
        let offset = req.params.offset;
        let limit = req.params.limit;
        pg.connect(connectionString, function (err, client, done) {
                if (err) {
                        return res.render('error', { message: "Database Exception" });
                }
                if (typeof limit === 'undefined' || typeof offset === 'undefined') { // does not specify pagination
                        client.query(`SELECT * FROM Posts ORDER BY creationTime DESC;`, function (err, result) {
                                if (err) {
                                        return res.render('error', { message: "Database Exception " + err });
                                }
                                return res.json({ posts: result });
                        });
                } else { // spcifies pagination
                        client.query(`SELECT * FROM Posts ORDER BY creationTime DESC LIMIT ${limit} OFFSET ${offset};`, function (err, result) {
                                if (err) {
                                        return res.render('error', { message: "Database Exception " + err });
                                }
                                return res.json({ posts: result });
                        });
                }
                done();
        });
});


// new post
router.post('/api/new/post', function (req, res, next) {
        let id = uuidv1();
        let username = req.body.username;
        let format = 1;
        let content = req.body.content;
        let location = req.body.location;
        let tags = req.body.tags;
        pg.connect(connectionString, function (err, client, done) {
                if (err) {
                        res.render('error', { message: "Database Exception" });
                }
                client.query(`INSERT INTO Posts VALUES('${id}', '${username}', ${format}, '${content}', '${location}', '${tags}', null)  RETURNING *;`, function (err, result) {
                        if (err) {
                                return res.render('error', { message: "Database Exception" });
                        }
                        return io.getInstance().emit('NewPost', result);
                        // return res.json({ post: result });
                });
                done();
        });
});


// delete a post
router.delete('/api/delete/post/:postId', function (req, res, next) {
        let postId = req.params.postId;
        pg.connect(connectionString, function (err, client, done) {
                if (err) {
                        res.render('error', { message: "Database Exception" });
                }
                client.query(`DELETE FROM Posts WHERE id = '${postId}' RETURNING id;`, function (err, result) {
                        if (err) {
                                return res.render('error', { message: "Database Exception" });
                        }
                        // console.log(result);
                        return io.getInstance().emit('DeletePost', result);
                        // return res.json({ post: result });
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

// get all the likes of the current user
router.get('/api/like/:userId', function(req, res, next) {
        let userId = req.params.userId;
        pg.connect(connectionString, function (err, client, done) {
                if (err) {
                        res.render('error', { message: "Database Exception " + err });
                }
                client.query(`SELECT postId FROM Likes WHERE userId = '${userId}';`, function (err, result) {
                        if (err) {
                                return res.render('error', { message: "Database Exception " + err });
                        }
                        return res.json({ likedPosts: result });
                });
                done();
        });
});

// get total number of likes of a post
router.get('/api/number/like', function(req, res, next) {
        // let postId = req.params.postId;
        pg.connect(connectionString, function (err, client, done) {
                if (err) {
                        res.render('error', { message: "Database Exception " + err });
                }
                client.query(`SELECT COUNT(userId) AS counter, postId FROM Likes GROUP BY postId;`, function (err, result) {
                        if (err) {
                                return res.render('error', { message: "Database Exception " + err });
                        }
                        return res.json({ 
                                likes: result
                        });
                });
                done();
        });
});



// upload files setup (image and video)
var imageStorage = multer.diskStorage({
        destination: function (req, file, cb) {
                cb(null, 'public/images/posts/')
        },
        filename: function (req, file, cb) {
                cb(null, file.fieldname + '.jpeg')
        }
});

var videoStorage = multer.diskStorage({
        destination: function (req, file, cb) {
                cb(null, 'public/videos/')
        },
        filename: function (req, file, cb) {
                cb(null, file.fieldname + '.mp4')
        }
});

var uploadImage = multer({ storage: imageStorage }).single('imagePost');
var uploadVideo = multer({ storage: videoStorage }).single('videoPost');

// image
router.post('/api/imgPost', function (req, res, next) {
        uploadImage(req, res, function (err) {
                if (err) {
                        return res.render('error', { message: "upload failed" });
                }
                console.log('file upload success');

                let filePath = req.file.path.substring(7);
                let id = uuidv1();
                let username = req.body.username;
                let format = 2;
                let content = req.body.content;
                let location = req.body.location;
                let tags = req.body.tags;
                pg.connect(connectionString, function (err, client, done) {
                        if (err) {
                                res.render('error', { message: "Database Exception" });
                        }
                        client.query(`INSERT INTO Posts VALUES('${id}', '${username}', ${format}, '${content}', '${location}', '${tags}', '${filePath}')  RETURNING *;`, function (err, result) {
                                if (err) {
                                        return res.render('error', { message: "Database Exception" });
                                }
                                return io.getInstance().emit('NewImgPost', result);
                        });
                        done();
                });
        });
});

// video
router.post('/api/vidPost', function (req, res, next) {
        uploadVideo(req, res, function (err) {
                if (err) {
                        return res.render('error', { message: "upload failed" });
                }
                console.log('file upload success');

                let filePath = req.file.path.substring(7);
                let id = uuidv1();
                let username = req.body.username;
                let format = 3;
                let content = req.body.content;
                let location = req.body.location;
                let tags = req.body.tags;
                pg.connect(connectionString, function (err, client, done) {
                        if (err) {
                                res.render('error', { message: "Database Exception" });
                        }
                        client.query(`INSERT INTO Posts VALUES('${id}', '${username}', ${format}, '${content}', '${location}', '${tags}', '${filePath}')  RETURNING *;`, function (err, result) {
                                if (err) {
                                        return res.render('error', { message: "Database Exception" });
                                }
                                return io.getInstance().emit('NewVidPost', result);
                        });
                        done();
                });
        });
});

router.get('/api/tag/:tags', function (req, res, next) {
        let tags = req.params.tags;
        pg.connect(connectionString, function (err, client, done) {
                if (err) {
                        return res.render('error', { message: "Database Exception " + err });
                }
                client.query(`SELECT * FROM posts WHERE tags = '${tags}' ORDER BY creationTime DESC;`, function (err, result) {
                        if (err) {
                                return res.render('error', { message: "Database Exception " + err });
                        }
                        return res.json({ posts: result });
                });
                done();
        });
});











module.exports = router;


