
const winston = require("winston");


module.exports  = function(){

    const logger = winston.createLogger({
        level:"info",

        format: winston.format.prettyPrint(),

        transports:[
            new winston.transports.File({filename:'error.log',level:"error"}),
            new winston.transports.File({filename:'combined.log'}),
            new winston.transports.Console()
        ]

    })

    winston.add(logger)

    
    

    process.on("uncaughtException", (err)=>{
        winston.error(err.message, err)
        process.exit(1)

    })

    process.on("unhandledRejection", (err)=>{
        winston.error(err.message, err)
        process.exit(1)

    })


}

