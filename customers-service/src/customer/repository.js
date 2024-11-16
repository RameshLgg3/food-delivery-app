// src/customer/repository.js
const { Order, OrdersMenu } = require("./model");

class OrderRepository {
    async createOrder(orderData) {
        return Order.create({ data: orderData });
    }

    async createOrderItems(orderMenuEntries) {
        const createdItems = await OrdersMenu.createMany({
            data: orderMenuEntries,
        });
        return createdItems;
    }

    async getAllOrders(status = "delivered") {
        const filter = status
            ? { where: { status: { equals: status, mode: "insensitive" } } }
            : {};
        return Order.findMany(filter);
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
