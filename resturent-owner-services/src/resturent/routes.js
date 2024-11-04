const express = require("express");
const router = express.Router();


router.get("/resturent", (req, res) => {
    res.json({ message: "Hello from Resturent Service!" });
});

module.exports = router;
