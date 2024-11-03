const express = require("express");
const deliveryRoutes = require("./deliveryServices/routes");
const locationRoutes = require("./locationServices/routes");

const app = express();

// Use JSON middleware
app.use(express.json());

// Load gateway routes
app.use("/delivery", deliveryRoutes);
app.use("/location", locationRoutes);

module.exports = app;
