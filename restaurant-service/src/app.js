const express = require("express");
const bodyParser = require("body-parser");
const restaurantRoutes = require("./restaurant/routes"); // Update route file name if needed

const app = express();

app.use(bodyParser.json());

// Use restaurant routes under the /api path
app.use("/api", restaurantRoutes);

module.exports = app;
