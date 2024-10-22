const express = require("express");
const app = express();
const customerRoutes = require("./customer/routes");

const PORT = process.env.PORT || 5001;

app.use(express.json());
app.use("/api", customerRoutes); // All customer routes will be prefixed with /api

app.listen(PORT, () => {
    console.log(`Customer Service is running on port ${PORT}`);
});
