const jwt = require("jsonwebtoken");

const authenticateToken = (req, res, next) => {
    try {
        const token = req.headers["authorization"]?.split(" ")[1]; // Get the token from the Authorization header

        if (!token) {
            return res.status(401).json({ message: "Access token is missing" }); // No token provided
        }

        jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
            if (err) {
                return res
                    .status(403)
                    .json({ message: "Invalid access token" }); // Invalid token
            }

            req.user = user; // Store user info for later use
            next();
        });
    } catch (error) {
        console.error("Error during token authentication:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};

module.exports = { authenticateToken };
