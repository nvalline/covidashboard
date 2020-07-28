const Bcrypt = require("bcryptjs");
const express = require("express");
const session = require("express-session");
const MongoStore = require("connect-mongo")(session);
const mongoose = require("mongoose");
const path = require("path");
const axios = require("axios");

const api = require("./routes/api");
const auth = require("./routes/auth");
const db = require("./models");
const passport = require("./config/passport");

const app = express();

const PORT = process.env.PORT || 3001;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//! Coronavirus API testing
app.get("/api/current/:state", (req, res) => {
    axios.get("https://covidtracking.com/api/v1/states/"
        + req.params.state
        + "/current.json")
        .then(response => {
            res.json(response.data);
        })
        .catch(e => console.log(e));
})

//! Connect to Database
const MONGO_URI = "mongodb://localhost/contact_tracing_db";

mongoose
    .connect(process.env.MONGODB_URI || MONGO_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
        useCreateIndex: true
    })
    .then(console.log(`MongoDB connected ${MONGO_URI}`))
    .catch(err => console.log(err));

// Express Session
app.use(
    session({
        secret: "three blind mice",
        resave: false,
        saveUninitialized: true,
        store: new MongoStore({ mongooseConnection: mongoose.connection })
    })
);

// Passport Middleware
app.use(passport.initialize());
app.use(passport.session());

// API Routes
app.use("/api", api);
// Authenticate route
app.use("/api/auth", auth);

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