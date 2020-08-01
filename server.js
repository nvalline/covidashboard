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

if (process.env.NODE_ENV === "production") {
    app.use(express.static("./build"));
    app.get("*", (req, res) =>
        res.sendFile(path.join(__dirname, "./build/index.html"))
    );
} else {
    app.get("*", (req, res) => {
        res.sendFile(path.join(__dirname, "./client/public/index.html"));
    });
}

app.listen(PORT, () => {
    console.log(`Server listening on PORT: ${PORT}`);
});
