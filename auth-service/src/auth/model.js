const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

class UserModel {
    static async createUser(data) {
        try {
            return await prisma.user.create({ data });
        } catch (error) {
            console.error("Error creating user:", error);
            throw new Error("Failed to create user");
        }
    }

    static async findUserByEmail(email) {
        try {
            return await prisma.user.findUnique({
                where: { email },
            });
        } catch (error) {
            console.error("Error finding user by email:", error);
            throw new Error("Failed to find user");
        }
    }
}

module.exports = UserModel;
