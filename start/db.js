const mongoose = require("mongoose");
const config = require("config");
const winston = require("winston")


module.exports = function(app) {

    mongoose.connect(config.get("db"))
     .then(db => winston.log({message:`db connection succeeded on port ${app.get('env') == 'development' ? config.get("port") : process.env.PORT}`, 
        level:"info"
    })
    )
    
}