require('dotenv').config();

const passport = require('passport');
const User = require('../models/user');
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const LocalStrategy = require('passport-local');

const localOptions = { usernameField: 'email' };
const localLogin = new LocalStrategy(localOptions, (email, password, done) => {
    User.findOne({ email: email }, (err, user) => {
        if (err) return done(err, false);
        if (!user) return done(null, false, { message: 'Incorrect email or password.' });

        user.comparePassword(password, function(err, isMatch) {
            if (err) return done(err, false);
            if (!isMatch) return done(null, false, { message: 'Incorrect email or password.' });

            return done(null, user, { message: 'Logged In Successfully' });
        });
    });
});

const jwtOptions = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.SECRET
};

const jwtLogin = new JwtStrategy(jwtOptions, (payload, done) => {
    User.findById(payload.sub, function(err, user) {
        if (err) return done(err, false);
        if (user) return done(null, user);

        return done(null, false);
    });
});

passport.use(jwtLogin);
passport.use(localLogin);
