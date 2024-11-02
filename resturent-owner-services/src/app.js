const express = require("express");
const app = express();
const resturentRoutes = require("./resturent/routes");

app.use(express.json());

app.use("/", resturentRoutes);

module.exports = app;