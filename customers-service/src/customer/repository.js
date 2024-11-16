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

    async getAllOrders(user_id, status) {
        const filter = {
            where: {
                ...(user_id && { user_id }), // Include user_id filter if provided
                ...(status && {
                    status: { equals: status, mode: "insensitive" }, // Include status filter if provided
                }),
            },
        };
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
