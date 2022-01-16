const winston = require("winston");


module.exports  = function(){

    new winston.transports.File({filename:"errors.logs"});

    process.on("uncaughtException", (err)=>{
        winston.log({level:"error",message:err.message})
        process.exit(1)

    })

    process.on("unhandledRejection", (err)=>{
        winston.log({level:"error",message:err.message})
        process.exit(1)

    })


}

