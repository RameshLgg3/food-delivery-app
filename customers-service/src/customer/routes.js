// In src/customer/routes.js
const express = require("express");
const router = express.Router();

// Hello World endpoint
router.get("/customers", (req, res) => {
    res.json({ message: "Hello from Customer Service!" });
});

module.exports = router;
