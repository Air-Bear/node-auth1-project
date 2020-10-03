const express = require("express");
const app = express();
const authRouter = require("./auth/authRouter.js");
const errorHandler = require("./errorHandler");
const session = require("express-session");

const sessionConfig = {
    name: "aycookie",
    secret: "I'm the best",
    cookie: {
        maxAge: 60 * 60 * 1000,
        secure: false,
        httpOnly: true
    },
    resave: false,
    saveUninitialized: false
}

app.use(session(sessionConfig));
app.use(express.json());
app.use("/api", authRouter);

app.use(errorHandler)

module.exports = app;