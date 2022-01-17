const welcome = require("../routes/welcome")
const error =  require("../middleware/error")

module.exports = function(app){

app.use("/", welcome)


app.use(error)
}