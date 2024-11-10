const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const authRepository = require("./repository");

exports.register = async (userData) => {
    try {
        const { email, password, role } = userData;

        // Check if user already exists
        const existingUser = await authRepository.findUserByEmail(email);
        if (existingUser) {
            return { status: 409, message: "User already exists" };
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Save user
        const user = await authRepository.createUser({
            email,
            password: hashedPassword,
            role: role,
        });

        return { status: 201, message: "User registered successfully", user };
    } catch (error) {
        console.error("Error during registration:", error);
        return { status: 500, message: "Internal Server Error" };
    }
};

exports.login = async (userData) => {
    try {
        const { email, password } = userData;

        // Check if user exists
        const user = await authRepository.findUserByEmail(email);
        if (!user) {
            return { status: 400, message: "Invalid email or password" };
        }

        // Compare the provided password with the hashed password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return { status: 400, message: "Invalid email or password" };
        }

        // Generate JWT token
        const token = jwt.sign(
            { id: user.id, email: user.email, role: user.role },
            process.env.JWT_SECRET,
            { expiresIn: "1h" }
        );

        return { status: 200, message: "Login successful", token };
    } catch (error) {
        console.error("Error during login:", error);
        return { status: 500, message: "Internal Server Error" };
    }
};
