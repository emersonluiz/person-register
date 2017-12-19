const pessoas = require('../models/pessoas');
const usuarios = require('../models/usuarios');

module.exports = {
    secret: "S3cr3T@",
    personBD: pessoas().model("persons"),
    userBD: usuarios().model("users")
};