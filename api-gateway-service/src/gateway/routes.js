const express = require("express");
const { createProxyMiddleware } = require("http-proxy-middleware");
const { authenticateToken, authorizeRoles } = require("./middleware"); // Import the JWT middleware
const fetch = require("node-fetch");

const router = express.Router();

router.use(authenticateToken);

// Auth service proxy (assuming auth-service runs on port 4000)
router.use(
    "/auth",
    createProxyMiddleware({
        target: "http://localhost:4000",
        changeOrigin: true,
    })
);

// Role-based authorization for customer service routes
router.get(
    "/customers",
    authorizeRoles("CUSTOMER"), // Only allow specific roles
    async (req, res) => {
        const url = `http://localhost:5001/api/customers`;
        const options = {
            method: "GET",
            headers: {
                Authorization: `Bearer ${
                    req.headers.authorization.split(" ")[1]
                }`,
            },
        };

        try {
            const response = await fetch(url, options);
            const data = await response.json();
            res.status(response.status).json(data);
        } catch (error) {
            console.error("Error fetching from customer service:", error);
            res.status(500).json({ message: "Internal Server Error" });
        }
    }
);

router.get("/", (req, res) => {
    res.send("Gateway is up and running");
});

module.exports = router;
