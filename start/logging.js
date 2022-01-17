
const winston = require("winston");


module.exports  = function(){

    const logger = winston.createLogger({
        level:"info",

        format: winston.format.colorize(),

        transports:[
            new winston.transports.File({filename:'error.log',level:"error"}),
            new winston.transports.File({filename:'combined.log'})
        ]

    })

    winston.add(logger)

    if(process.env.NODE_ENV == "development"){
        logger.add(new winston.transports.Console())
    }

    
    

    process.on("uncaughtException", (err)=>{
        winston.log({level:"error",message:err.message})
        process.exit(1)

    })

    process.on("unhandledRejection", (err)=>{
        winston.log({level:"error",message:err.message})
        process.exit(1)

    })


}

