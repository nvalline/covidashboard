const express = require("express");
const mongoose = require("mongoose");
const Bcrypt = require("bcryptjs");

const app = express();
const db = require("./models");

const PORT = process.env.PORT || 3001;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

if (process.env.NODE_ENV === "production") {
    app.use(express.static("client/build"));
}

app.get("/", (req, res) => {
    res.send("HELLO THERE")
})

// ! Routes for testing
app.post("/api/user", (req, res) => {
    db.User.create(req.body)
        .then(dbUser => {
            res.sendStatus(200);
            console.log("DBUSER:", dbUser)
        })
        .catch(err => console.log(err))
})

app.post("/api/event", (req, res) => {
    db.Event.create(req.body)
        .then(dbUser => {
            res.sendStatus(200);
            console.log("DBUSER:", dbUser)
        })
        .catch(err => console.log(err))
})

// Connect to Database
mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/contact_tracing_db", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true
})

app.listen(PORT, () => {
    console.log(`Server listening on PORT: ${PORT}`)
});