const jwt = require("jsonwebtoken");

const authenticateToken = (req, res, next) => {
    const token = req.headers["authorization"]?.split(" ")[1]; // Get the token from the Authorization header

    if (!token) {
        return res
            .status(401)
            .json({ message: "Access Denied: No Token Provided!" });
    }

    jwt.verify(token, "Api based products", (err, user) => {
        if (err) {
            // Handle token validation error
            return res
                .status(403)
                .json({ message: "Access Denied: Invalid Token!" }); // Forbidden
        }

        req.user = user; // Store user info for later use
        next();
    });
};

// Role-based authorization middleware
function authorizeRoles(...roles) {
    return (req, res, next) => {
        const role = req.user.role;

        if (!roles.includes(role)) {
            return res
                .status(403)
                .json({ message: "Forbidden: Insufficient role" });
        }
        next();
    };
}

module.exports = { authenticateToken, authorizeRoles };
