const express = require("express");
const adminRoutes = require("./admin/routes");
const app = express();

// Use JSON middleware
app.use(express.json());

// Load admin routes
app.use("/", adminRoutes);

module.exports = app;
