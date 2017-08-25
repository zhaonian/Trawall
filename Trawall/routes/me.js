var express = require('express');
var router = express.Router();

/* GET me page. */
router.get('/', function (req, res, next) {
        res.render('me', { 
                username: req.session.username,
                id: req.session.id
        });
});

module.exports = router;
