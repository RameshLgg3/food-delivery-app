const UserModel = require("./model");

class UserRepository {
    static async createUser(userData) {
        return await UserModel.createUser(userData);
    }

    static async findUserByEmail(email) {
        return await UserModel.findUserByEmail(email);
    }
}

module.exports = UserRepository;
