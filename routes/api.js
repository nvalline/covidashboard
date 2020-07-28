const express = require("express");

const router = express.Router();

// logout route
router.get("/logout", (req, res) => {
    req.logout();
    res.redirect("/login");
});

module.exports = router;