const mongoose = require("mongoose");
const config = require("config");
const winston = require("winston")


module.exports = function() {

    mongoose.connect(config.get("db"))
     .then(db => winston.log({message:`db connection succeeded on port ${config.get("port")}`, level:"info"}))
    
}