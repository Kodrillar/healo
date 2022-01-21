const index = require("../routes/welcome")
const error =  require("../middleware/error")
const blog = require("../routes/blog")
const express = require("express")
const suggestion = require("../routes/suggestion")
const { urlencoded } = require("express")

module.exports = function(app){

app.use(urlencoded({extended:true}))
app.use(express.json())
app.use("/", index)
app.use("/api/blog", blog)
app.use("/api/suggestion", suggestion)

app.use(error)
}