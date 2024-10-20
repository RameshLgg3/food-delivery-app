const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

exports.createUser = async (userData) => {
    const user = await prisma.user.create({
        data: userData,
    });
    return user;
};

exports.findUserByEmail = async (email) => {
    return await prisma.user.findUnique({
        where: { email },
    });
};
