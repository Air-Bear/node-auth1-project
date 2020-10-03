const db = require("../data/dbConfig");

function find() {
    return db("users").select("id", "username");
}

function add(data) {
    return db("users").insert(data);
}

function findBy(username) {
    return db("users").where({username}).first()
}



module.exports = {
    find,
    add,
    findBy
}