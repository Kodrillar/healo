const dailyTips = require("../routes/dailyTips")


module.exports = function(app){
app.use("/dailytips", dailyTips)
}