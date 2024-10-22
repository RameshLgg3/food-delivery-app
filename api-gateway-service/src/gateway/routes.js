const express = require("express");
const { createProxyMiddleware } = require("http-proxy-middleware");
const { authenticateToken } = require("./middleware"); // Import the JWT middleware
const router = express.Router();

// Auth service proxy (assuming auth-service runs on port 4000)
router.use(
    "/auth",
    createProxyMiddleware({
        target: "http://localhost:4000",
        changeOrigin: true,
    })
);

// Customer service proxy with JWT authentication
router.use("/customers", authenticateToken, (req, res) => {
    // Make a request to the customer service
    const options = {
        method: "GET",
        headers: {
            Authorization: `Bearer ${req.headers.authorization.split(" ")[1]}`, // Pass the token to the customer service
        },
        // Adjust the URL to match your customer service address
        url: "http://localhost:5001/api/customers",
    };

    fetch(options.url, { method: options.method, headers: options.headers })
        .then((response) => response.json())
        .then((data) => res.json(data))
        .catch((error) => {
            console.error("Error fetching from customer service:", error);
            res.sendStatus(500);
        });
});

router.get("/", authenticateToken, (req, res) => {
    res.send("Gateway is up and running");
});

module.exports = router;
