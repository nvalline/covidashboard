const bcrypt = require("bcryptjs");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;

const db = require("../models");
const { User } = require("../models");

passport.use(
    new LocalStrategy({ usernameField: "email", passReqToCallback: true },
        (req, email, password, done) => {
            db.User.findOne({
                where: {
                    email: email
                }
            }).then(dbUser => {
                if (!dbUser) {

                } else {
                    bcrypt.compare(password, user.password, (err, isMatch) => {
                        if (err) throw err;
                        if (isMatch) {
                            return done(null, user);
                        } else {
                            return done(null, false, { message: "Incorrect Password" });
                        }
                    });
                }
            })
                .catch(err => {
                    return done(null, false, { message: err });
                });
        })
);

passport.serializeUser((user, cb) => {
    cb(null, user);
});

passport.deserializeUser((obj, cb) => {
    cb(null, obj);
});

module.exports = passport;
