const jwt = require("jsonwebtoken");

const authenticateToken = (req, res, next) => {
    const token = req.headers["authorization"]?.split(" ")[1]; // Get the token from the Authorization header

    if (!token) return res.sendStatus(401); // No token provided

    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if (err) return res.sendStatus(403); // Invalid token

        req.user = user; // Store user info for later use
        next();
    });
};

module.exports = { authenticateToken };
