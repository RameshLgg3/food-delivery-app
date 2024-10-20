const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const authRepository = require("./repository");

exports.register = async (userData) => {
    const { email, password } = userData;

    // Check if user already exists
    const existingUser = await authRepository.findUserByEmail(email);
    if (existingUser) {
        return { status: 400, message: "User already exists" };
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Save user
    const user = await authRepository.createUser({
        email,
        password: hashedPassword,
    });

    return { status: 201, message: "User registered successfully", user };
};

exports.login = async (userData) => {
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

    // If successful, return a success message (consider adding JWT logic here later)

    // Generate JWT token
    const token = jwt.sign(
        { id: user.id, email: user.email },
        process.env.JWT_SECRET,
        { expiresIn: "1h" }
    );

    return { status: 200, message: "Login successful", token }; // Return the token
};
