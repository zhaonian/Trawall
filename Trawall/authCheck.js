module.exports = function (req, res, next) {
        if (req.session.id === "username=Please" || !req.session.id) {
                // return res.render('login', {});
                return res.render('login', {});
        } else {
                next();
        }
};