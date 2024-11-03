const jwt = require("jsonwebtoken");

const authenticateToken = (req, res, next) => {
    const token = req.headers["authorization"]?.split(" ")[1]; // Get the token from the Authorization header

    if (!token) {
        return res
            .status(401)
            .json({ message: "Access Denied: No Token Provided!" });
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if (err) {
            // Handle token validation error
            return res
                .status(403)
                .json({ message: "Access Denied: Invalid Token!" }); // Forbidden
        }

        console.log(user)

        if(user.userType !== 'deliveryagent') {
            return res
                .status(403)
                .json({ message: "Access Denied: Not a delivery agent" }); // Forbidden
        }
        req.user = user; // Store user info for later use
        next();
    });
};

module.exports = { authenticateToken };
