const express = require("express");
const passport = require("passport");
const bcrypt = require("bcryptjs");

const router = express.Router();

const { User } = require("../models");

// Register Handle
router.post("/register", (req, res, next) => {
    const { email, password, password2, state, county } = req.body;
    let errors = [];

    if (!email || !password || !state || !county) {
        errors.push({ msg: "Please fill in all fields" });
    }

    if (password !== password2) {
        errors.push({ msg: "Passwords do not match" });
    }

    if (password.length < 6) {
        errors.push({ msg: "Password should be at least 8 characters" });
    }

    if (errors.length > 0) {
        res.send({ errors });
    } else {
        User.findOne({ email: email })
            .then(user => {
                if (user) {
                    // User exists
                    errors.push({ msg: "Email is already registered" });
                    res.send({ errors });
                } else {
                    const newUser = new User({
                        email,
                        password,
                        state,
                        county
                    });

                    // Hash Password
                    bcrypt.genSalt(10, (err, salt) => {
                        bcrypt.hash(newUser.password, salt, (err, hash) => {
                            if (err) throw err;
                            // Set password to hash
                            newUser.password = hash;
                            // Save new user
                            newUser.save()
                                .then(user => {
                                    res.send({ success_msg: "You are now registered and may now log in" });
                                })
                                .catch(err => console.log(err));
                        });
                    });
                }
            });
    }
});

// Login Handle
router.post("/login", (req, res, next) => {
    passport.authenticate("local", (err, user, info) => {
        if (err) throw err;
        if (user) {
            res.send({ auth: true });
        } else {
            res.send(info);
        }
    })(req, res, next);
});

// Logout Handle
router.get("/logout", (req, res) => {
    req.logout();
    res.send({ msg: 'You are logged out', auth: false });
});

module.exports = router;