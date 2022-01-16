const express = require("express");
const app = express();
const config = require("config");



const port = process.env.PORT || config.get("port")

app.listen(port);