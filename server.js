const express = require("express");
const path = require("path");
const mongoose = require("mongoose");
const Bcrypt = require("bcryptjs");

const app = express();
const db = require("./models");

const PORT = process.env.PORT || 3001;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//! Routes for testing
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

//! Coronavirus API testing
app.get("/api/covid-data", (req, res) => {
    axios.get("https://covidtracking.com/api/v1/states/"
    + search
    + "/current.json")
      .then(res => {
          res.json();
      })
      .catch(e => console.log(e));
})

//! Connect to Database
mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/contact_tracing_db", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true
})

//! serve static assets
if (process.env.NODE_ENV === 'production') {
    app.use(express.static('./build'));
    // server index.html if `/about` reached -> assets served through `express.static`
    app.get('*', (req, res) => res.sendFile(path.join(__dirname, './build/index.html')));
} else {
    //! Home Route
    app.get("*", (req, res) => {
        res.sendFile(path.join(__dirname, './client/public/index.html'))
    })
}

app.listen(PORT, () => {
    console.log(`Server listening on PORT: ${PORT}`)
});