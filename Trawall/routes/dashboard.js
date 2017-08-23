var express = require('express');
var router = express.Router();

/* GET dashboard page. */
router.get('/', function (req, res, next) {
        res.render('dashboard', {
                title: 'Trawall',
                userId: req.session.id,
                userName: req.session.username ? req.session.username : 'Please update your username'
        });
});

module.exports = router;
