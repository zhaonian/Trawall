var express = require('express');
const pg = require('pg');

var router = express.Router();


const connectionString = process.env.DATABASE_URL || "postgres://luan:postgresql-luan@localhost/trawall"; // explicitely put pw here?

/* GET password reset page. */
router.get('/:email/reset-password/:recoveryToken', function (req, res, next) {
        let email = req.params.email;
        let recoveryToken = req.params.recoveryToken;
        pg.connect(connectionString, function (err, client, done) {
                if (err) {
                        return console.error("error!", err);
                }
                client.query(`SELECT * FROM Trawall_Users WHERE email = '${email}' AND recoveryToken = '${recoveryToken}';`, function (err, result) {
                        if (err) {
                                return res.render('error', { message: "Database Exception" });
                        }
                        if (result.rowCount === 1) {
                                return res.render('passwordReset', {
                                        email: email,
                                });
                        } else {
                                return res.render('error', { message: "Invalid Link" });
                        }
                });
                done();
        });

});

module.exports = router;
