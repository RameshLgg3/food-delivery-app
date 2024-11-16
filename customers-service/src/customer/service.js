// src/customer/service.js
const orderRepository = require("./repository");

class OrderService {
    async createOrder(data) {
        return orderRepository.createOrder(data);
    }

    async addOrderItems(order_number, order_items) {
        const orderMenuEntries = order_items.map((item) => ({
            order_number,
            restaurant_id: item.restaurant_id,
            menu_item_id: item.menu_item_id,
            quantity: item.quantity,
            price: item.price,
        }));

        return orderRepository.createOrderItems(orderMenuEntries);
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
