const express = require("express");
const app = express();
const config = require("config");

require("./start/logging")();
require("./start/db")()
require("./start/routes")(app)


const port = process.env.PORT || config.get("port")

app.listen(port);