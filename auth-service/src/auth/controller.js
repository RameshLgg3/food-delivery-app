const authService = require("./service");
const { registerValidation, loginValidation } = require("./validation");

exports.register = async (req, res) => {
    try {
        // Validate request data
        const { error } = registerValidation(req.body);
        if (error)
            return res.status(400).json({ message: error.details[0].message });

        const result = await authService.register(req.body);
        return res.status(result.status).json({ message: result.message });
    } catch (err) {
        // Handle specific errors, such as unique constraint violations
        if (
            err.code === "P2002" &&
            err.meta &&
            err.meta.target.includes("email")
        ) {
            // Prisma's P2002 error code for unique constraint violations
            return res.status(409).json({ message: "User already exists" });
        }

        // Generic error handler for unexpected issues
        return res
            .status(500)
            .json({ message: "Internal Server Error", error: err.message });
    }
};

exports.login = async (req, res) => {
    // Validate request data
    const { error } = loginValidation(req.body);
    if (error)
        return res.status(400).json({ message: error.details[0].message });

    const result = await authService.login(req.body);
    return res
        .status(result.status)
        .json({ message: result.message, token: result.token }); // Include the token in the response
};
