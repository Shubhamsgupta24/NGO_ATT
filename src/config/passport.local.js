
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

passport.use(new LocalStrategy(
    {
        usernameField: "email",
        passReqToCallback: true
    },
    async function (req, email, password, done) {
        try {
            const user = await User.findOne({ where: { email: email } });

            if (!user || user.password !== password) {
                req.flash('error', 'Invalid Username/Password');
                console.log('Invalid username/password');
                return done(null, false);
            } else {
                return done(null, user);
            }
        } catch (err) {
            req.flash('error', err.message);
            console.log('Error in finding the user');
            return done(err);
        }
    }
));

// Serializing the user and deciding which key is to be set in the cookie.
passport.serializeUser(function (user, done) {
    done(null, user.id);
});

// Deserializing the user from the key in the cookie.
passport.deserializeUser(function (id, done) {
    User.findByPk(id)
        .then((user) => {
            return done(null, user);
        })
        .catch((err) => {
            console.log('Error in finding the user--->passport');
            return done(err);
        });
});

passport.checkAuthentication = function (req, res, next) {
    // If the user is signed in, pass on the request to the next function (controller's action)
    if (req.isAuthenticated()) {
        return next();
    }

    // If the user is not signed in
    return res.redirect('/users/sign-in');
};

passport.setAuthenticatedUser = function (req, res, next) {
    if (req.isAuthenticated()) {
        // req.user contains the current signed-in user from the session cookie, and we are just sending this to the locals for the views
        res.locals.user = req.user;
    }

    next();
};

module.exports = passport;
