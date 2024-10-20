const express = require("express");
const authRoutes = require("./auth/routes");

const app = express();
app.use(express.json()); // Ensure body parsing middleware is added

app.use("/auth", authRoutes); // Ensure this is correct

module.exports = app;
