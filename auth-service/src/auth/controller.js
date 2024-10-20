const authService = require("./service");
const { registerValidation, loginValidation } = require("./validation");

exports.register = async (req, res) => {
    // Validate request data
    const { error } = registerValidation(req.body);
    if (error)
        return res.status(400).json({ message: error.details[0].message });

    const result = await authService.register(req.body);
    return res.status(result.status).json({ message: result.message });
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
