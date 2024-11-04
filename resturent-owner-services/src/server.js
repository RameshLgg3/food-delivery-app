const express = require("express");
const app = express();
const resturentRoutes = require("./resturent/routes");

const PORT = process.env.PORT || 5002;

app.use(express.json());
app.use("/api", resturentRoutes); // All resturent routes will be prefixed with /api

app.listen(PORT, () => {
    console.log(`Resturent Service is running on port ${PORT}`);
});