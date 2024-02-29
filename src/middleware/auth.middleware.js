
const auth = (req, res, next) => {
    if (req.session.email) {
        next();
    } else {
        res.render('sign_in', {
            title: "sign In"
        });
    }
};

module.exports = auth;
