module.exports = function (req, res, next) {
        if (typeof req.session.id  === 'undefined' || req.session.id === "username=Please" || !req.session.id) {
                res.redirect('/login');
        } else {
                next();
        }
};