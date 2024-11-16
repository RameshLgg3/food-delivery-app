// src/customer/controller.js
const orderService = require("./service");
const restaurantService = require("./restaurantService");

class OrderController {
    async createOrder(req, res) {
        const user_id = req.user.id;
        const order_number = `OR${Date.now()}`;
        const status = "Pending";
        const delivery_status = "Pending";
        const { amount, order_items } = req.body;

        try {
            const order = await orderService.createOrder({
                user_id,
                order_number,
                amount,
                status,
                delivery_status,
            });

            await orderService.addOrderItems(order.order_number, order_items);

            res.status(201).json({
                status: 201,
                message: "Order has been created.",
                data: order,
            });
        } catch (error) {
            res.status(500).json({ message: "Error creating order", error });
        }
    }

    async getAllOrders(req, res) {
        try {
            const user_id = req.user.id;
            const orders = await orderService.getAllOrders(user_id);
            res.json({ status: 200, message: "Success", data: orders });
        } catch (error) {
            res.status(500).json({ message: "Internal Server Error" });
        }
    }

    async getOrderById(req, res) {
        const { id } = req.params;

        try {
            const order = await orderService.getOrderById(id);
            res.json({ status: 200, message: "Success", data: order });
        } catch (error) {
            res.status(404).json({ message: "Order not found" });
        }
    }

    async updateOrder(req, res) {
        const { id } = req.params;
        const { status, delivery_status } = req.body;

        if (status === undefined && delivery_status === undefined) {
            return res.status(400).json({ message: "No fields to update" });
        }

        try {
            const updatedOrder = await orderService.updateOrder(id, {
                ...(status !== undefined && { status }),
                ...(delivery_status !== undefined && { delivery_status }),
            });
            res.json(updatedOrder);
        } catch (error) {
            res.status(404).json({ message: "Order not found" });
        }
    }

    async fetchRestaurants(req, res) {
        try {
            const token = req.headers.authorization;
            if (!token) {
                return res
                    .status(401)
                    .json({ message: "Access Denied: No Token Provided" });
            }
            const restaurants = await restaurantService.getAllRestaurants(
                token
            );
            res.status(200).json(restaurants);
        } catch (error) {
            res.status(500).json({
                message: "Error fetching restaurants: " + error,
            });
        }
    }

    async searchRestaurants(req, res) {
        try {
            const { keyword } = req.query;
            const token = req.headers.authorization;
            if (!keyword) {
                return res
                    .status(401)
                    .json({ message: "Keyword can not be empty" });
            }
            if (!token) {
                return res
                    .status(401)
                    .json({ message: "Access Denied: No Token Provided" });
            }
            const restaurants = await restaurantService.searchRestaurants(
                token,
                keyword
            );
            res.status(200).json(restaurants);
        } catch (error) {
            res.status(500).json({
                message: "Error searching restaurants: " + error,
            });
        }
    }

    async searchMenu(req, res) {
        try {
            const { keyword } = req.query;
            const token = req.headers.authorization;
            if (!keyword) {
                return res
                    .status(401)
                    .json({ message: "Keyword can not be empty" });
            }
            if (!token) {
                return res
                    .status(401)
                    .json({ message: "Access Denied: No Token Provided" });
            }
            const restaurants = await restaurantService.searchMenu(
                token,
                keyword
            );
            res.status(200).json(restaurants);
        } catch (error) {
            res.status(500).json({
                message: "Error searching menu: " + error,
            });
        }
    }

    // src/customer/controller.js

    async reOrder(req, res) {
        const { order_number } = req.params;
        const user_id = req.user.id;

        try {
            // Get the existing order by order_number
            const existingOrder = await orderService.getOrderByOrderNumber(
                order_number
            );

            if (!existingOrder || existingOrder.user_id !== user_id) {
                return res
                    .status(404)
                    .json({ message: "Order not found or unauthorized" });
            }

            // Recreate the order with the same details but new order number and delivery status
            const newOrderData = {
                user_id: existingOrder.user_id,
                order_number: `OR${Date.now()}`, // Generate a new unique order number
                amount: existingOrder.amount,
                status: "Pending", // Default or as needed
                delivery_status: "Pending",
            };

            // Create a new order
            const newOrder = await orderService.createOrder(newOrderData);

            // Recreate the order items
            await orderService.addOrderItems(
                newOrder.order_number,
                existingOrder.order_items
            );

            res.status(201).json({
                status: 201,
                message: "Reorder created successfully",
                data: newOrder,
            });
        } catch (error) {
            console.error("Error creating reorder:", error);
            res.status(500).json({ message: "Error creating reorder", error });
        }
    }
}

module.exports = new OrderController();
