require("dotenv").config();
const express = require("express");
const gatewayRoutes = require("./gateway/routes");
const app = express();

// Use JSON middleware
app.use(express.json());

// Load gateway routes
app.use("/", gatewayRoutes);

module.exports = app;
