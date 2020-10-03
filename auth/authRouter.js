const express = require("express");
const Users = require("./authModel");
const bcrypt = require("bcryptjs");
const restrict = require("./restrictedMiddleware");

const router = express.Router();

router.use("/users", restrict);

router.post("/register", (req, res, next) => {
    const hash = bcrypt.hashSync(req.body.password, 10);
    req.body.password = hash;

    Users.add(req.body)
    .then(user => {
        res.status(201).json(user);
    })
    .catch(err => {
        next({apiCode: 500, apiMessage: "error registering", ...err});
    });
});

router.post("/login", (req, res, next) => {
    let {username, password} = req.body;

    Users.findBy(username)
    .then(user => {
        if(user && bcrypt.compareSync(password, user.password)){
            req.session.user = user;
            res.status(200).json({message: "logged in!"})
        } else{
            next({apiCode: 401, apiMessage: "invalid credentials"});
        }
    })
    .catch(err => {
        next({apiCode: 500, apiMessage: "error logging in", ...err});
    });
});

router.get("/users", (req, res, next) => {
    Users.find()
    .then(users => {
        res.status(200).json(users);
    })
    .catch(err => {
        next({apiCode: 500, apiMessage: "error retriving user list", ...err});
    })
});

module.exports = router;