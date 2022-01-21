
const winston = require("winston")

module.exports = function(err,req, res, next){

    res.status(500).send("Server Error...please be patient");
    winston.error(err.message, err)
}