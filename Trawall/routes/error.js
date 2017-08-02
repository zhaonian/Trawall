var express = require('express');
var router = express.Router();

/* GET error page. */
router.get('/', function (req, res, next) {
        res.render('error', { message: 'error msg' });
});

module.exports = router;
