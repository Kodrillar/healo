const express = require("express");
const app = express();
const config = require("config");

require("./start/logging")();
require("./start/db")()
require("./start/joi")()
require("./start/routes")(app)


const port = process.env.PORT || config.get("port")

const server = app.listen(port);

module.exports =server;

