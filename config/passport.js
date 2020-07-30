const bcrypt = require("bcryptjs");
const passport = require("passport");
const mongoose = require("mongoose");
const LocalStrategy = require("passport-local").Strategy;

const db = require("../models");

passport.use(
    new LocalStrategy({ usernameField: "email" },
        (email, password, done) => {
            // Match User
            db.User.findOne({ email: email })
                .then(user => {
                    if (!user) {
                        return done(null, false, { message: "Email Not Registered" });
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

passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser((id, done) => {
    db.User.findById(id, (err, user) => {
        done(err, user);
    });
});

module.exports = passport;
