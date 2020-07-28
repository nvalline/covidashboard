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
                    const state = req.body.state;
                    const county = req.body.county;
                    const newUser = new User({ email, password, state, county });

                    bcrypt.genSalt(10, (err, salt) => {
                        bcrypt.hash(newUser.password, salt, (err, hash) => {
                            if (err) throw err;
                            newUser.password = hash;
                            newUser
                                .save()
                                .then(user => {
                                    return done(null, user);
                                })
                                .catch(err => {
                                    return done(null, false, { message: err });
                                });
                        });
                    });
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
