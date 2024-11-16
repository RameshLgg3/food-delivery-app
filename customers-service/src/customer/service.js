// src/customer/service.js
const orderRepository = require("./repository");

class OrderService {
    async createOrder(data) {
        return orderRepository.createOrder(data);
    }

    async addOrderItems(order_number, order_items) {
        console.log(order_items);
        return;
        const orderMenuEntries = order_items.map((item) => ({
            order_number,
            restaurant_id: item.restaurant_id,
            menu_item_id: item.menu_item_id,
            quantity: item.quantity,
            price: item.price,
        }));

        return orderRepository.createOrderItems(orderMenuEntries);
    }

    async getAllOrders(user_id) {
        return orderRepository.getAllOrders(user_id);
    }

    async getOrderById(id) {
        const order = await orderRepository.getOrderById(id);
        if (!order) throw new Error("Order not found");
        return order;
    }

    async updateOrder(id, data) {
        return orderRepository.updateOrder(id, data);
    }

    async getOrderByOrderNumber(order_number) {
        // Step 1: Get the existing order by order_number
        const existingOrder = await orderRepository.getOrderByNumber(
            order_number
        );

        if (!existingOrder) {
            throw new Error("Order not found");
        }

        // Step 2: Create the new order with the same details but with a new order number
        const newOrderData = {
            user_id: existingOrder.user_id,
            order_number: `OR${Date.now()}`, // New order number
            amount: existingOrder.amount,
            status: "Pending", // Default status for reorder
            delivery_status: "Pending", // Default or use provided value
        };

        // Create the new order
        const newOrder = await orderRepository.createOrder(newOrderData);

        // Step 3: Copy the items from the old order to the new one
        if (
            !existingOrder.orders_menu ||
            existingOrder.orders_menu.length === 0
        ) {
            throw new Error("No items found in the original order");
        }

        const orderItems = existingOrder.orders_menu.map((item) => ({
            restaurant_id: item.restaurant_id,
            menu_item_id: item.menu_item_id,
            quantity: item.quantity, // Copy quantity
            price: item.price, // Copy price
        }));

        // Add items to the new order
        // await this.addOrderItems(newOrder.order_number, orderItems);

        return newOrder;
    }
}

module.exports = new OrderService();
