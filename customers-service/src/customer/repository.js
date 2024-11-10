// src/customer/repository.js
const { Order } = require("./model");

class OrderRepository {
    async createOrder(orderData) {
        return Order.create({ data: orderData });
    }

    async getAllOrders() {
        return Order.findMany();
    }

    async getOrderById(id) {
        return Order.findUnique({ where: { id: parseInt(id) } });
    }

    async updateOrder(id, updateData) {
        return Order.update({
            where: { id: parseInt(id) },
            data: updateData,
        });
    }
}

module.exports = new OrderRepository();
