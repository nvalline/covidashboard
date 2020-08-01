const express = require("express");
const session = require("express-session");
const MongoStore = require("connect-mongo")(session);
const mongoose = require("mongoose");
const path = require("path");
const axios = require("axios");

const api = require("./routes/api");
const auth = require("./routes/auth");
const passport = require("./config/passport");

const app = express();

const PORT = process.env.PORT || 3001;

// Connect to Database
const MONGO_LOCAL_URI = require("./config/keys").MongoURI;

mongoose
    .connect(process.env.MONGODB_URI || MONGO_LOCAL_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
        useCreateIndex: true
    })
    .then(console.log(`MongoDB connected`))
    .catch(err => console.log(err));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Express Session
app.use(
    session({
        secret: "three blind mice",
        resave: true,
        saveUninitialized: true,
        store: new MongoStore({ mongooseConnection: mongoose.connection })
    })
);

// Passport Middleware
app.use(passport.initialize());
app.use(passport.session());

// Routes
app.use("/api", api);
app.use("/auth", auth);

const routes = require("./routes");
app.use(routes);

//! serve static assets
if (process.env.NODE_ENV === "production") {
    app.use(express.static("./build"));
    // server index.html if `/about` reached -> assets served through `express.static`
    app.get("*", (req, res) =>
        res.sendFile(path.join(__dirname, "./build/index.html"))
    );
} else {
    //! Home Route
    app.get("*", (req, res) => {
        res.sendFile(path.join(__dirname, "./client/public/index.html"));
    });
}

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

app.listen(PORT, () => {
    console.log(`Server listening on PORT: ${PORT}`);
});
