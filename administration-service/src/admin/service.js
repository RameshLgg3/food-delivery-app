// src/customer/service.js
const adminRepository = require("./repository");

class adminService {
    async createUser(data) {
        return adminRepository.createUser(data);
    }

    async getAllUsers() {
        return adminRepository.getAllUsers();
    }

    async getUserById(id) {
        const user = await adminRepository.getUserById(id);
        if (!user) throw new Error("User not found");
        return user;
    }

    async updateUser(id, data) {
        return adminRepository.updateUser(id, data);
    }

    async getAverageDeliveryTime() {
        return adminRepository.getAverageDeliveryTime();
    }
    
    async getActiveUsers() {
        return adminRepository.getActiveUsers();
    }
    
    async getOrderTrends() {
        return adminRepository.getOrderTrends();
    }


}

module.exports = new adminService();
