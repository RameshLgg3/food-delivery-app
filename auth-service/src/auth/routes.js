const express = require("express");
const authController = require("./controller");
const { authenticateToken } = require("./middleware");

const router = express.Router();

router.post("/register", authController.register);
router.post("/login", authController.login); // Add login route

router.get("/profile", authenticateToken, (req, res) => {
    res.json({
        message: `Welcome ${req.user.email}`,
        userId: req.user.id, // You can add more user details if needed
    });
});

module.exports = router;
