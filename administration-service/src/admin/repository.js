// src/customer/repository.js
const { User } = require("./model");

class adminRepository {
    async createUser(orderData) {
        return User.create({ data: orderData });
    }

    async getAllUsers() {
        return User.findMany();
    }

    async getUserById(id) {
        return User.findUnique({ where: { id: parseInt(id) } });
    }

    async updateUser(id, updateData) {
        return User.update({
            where: { id: parseInt(id) },
            data: updateData,
        });
    }

    async getActiveUsers(active) {
        return User.findMany({ where: { active: active } });
    }

}

module.exports = new adminRepository();
