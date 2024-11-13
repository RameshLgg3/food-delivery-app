// src/customer/service.js
const orderRepository = require("./repository");

class OrderService {
    async createOrder(data) {
        return orderRepository.createOrder(data);
    }

    async getAllOrders() {
        return orderRepository.getAllOrders();
    }

    async getOrderById(id) {
        const order = await orderRepository.getOrderById(id);
        if (!order) throw new Error("Order not found");
        return order;
    }

    async updateOrder(id, data) {
        return orderRepository.updateOrder(id, data);
    }
}

module.exports = new OrderService();
