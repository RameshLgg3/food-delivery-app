// src/customer/controller.js
const adminService = require("./service");
const orderService = require("./orderService");

class adminController {
    async createUser(req, res) {
        const { user_id, email, password, role, active } =
            req.body;

        try {
            const user = await adminService.createUser({
                user_id,
                email,
                password,
                role,
                active,
            });
            res.status(201).json({
                status: 201,
                message: "User has been created.",
                data: user,
            });
        } catch (error) {
            res.status(500).json({ message: "Error creating user", error });
        }
    }

    async getAllUsers(req, res) {
        try {
            const users = await adminService.getAllUsers();
            res.json({ status: 200, message: "Success", data: users });
        } catch (error) {
            res.status(500).json({ message: "Internal Server Error" });
        }
    }

    async getUserById(req, res) {
        const { id } = req.params;

        try {
            const user = await adminService.getOrderById(id);
            res.json({ status: 200, message: "Success", data: user });
        } catch (error) {
            res.status(404).json({ message: "User not found" });
        }
    }

    async updateUser(req, res) {
        const { id } = req.params;
        const { active } = req.body;

        if (active === undefined) {
            return res.status(400).json({ message: "No fields to update" });
        }

        try {
            const updatedUser = await adminService.updateUser(id, {
                ...(active !== undefined && { active }),
            });
            res.json(updatedUser);
        } catch (error) {
            res.status(404).json({ message: "User not found" });
        }
    }

 
    async getActiveUsers(req, res) {
        try {
            const users = await adminService.getActiveUsers();
            res.json({ status: 200, message: "Success", data: users });
        } catch (error) {
            res.status(500).json({ message: "Internal Server Error" });
        }
    }

    async getAllOrders(req, res) {
        try {
            const token = req.headers.authorization;
            if (!token) {
                return res
                    .status(401)
                    .json({ message: "Access Denied: No Token Provided" });
            }
            const orders = await orderService.getAllOrders(
                token
            );
            res.status(200).json(orders);
        } catch (error) {
            res.status(500).json({
                message: "Error fetching orders: " + error,
            });
        }
    }

    async getOrderById(req, res) {
        try {
            const token = req.headers.authorization;
            if (!token) {
                return res
                    .status(401)
                    .json({ message: "Access Denied: No Token Provided" });
            }
            const { id } = req.params;
            const order = await orderService.getOrderById(id, 
                token
            );
            res.status(200).json(order);
        } catch (error) {
            res.status(500).json({
                message: "Error fetching order: " + error,
            });
        }
    }

    async updateOrder(req, res) {
        try {
            const token = req.headers.authorization;
            if (!token) {
                return res
                    .status(401)
                    .json({ message: "Access Denied: No Token Provided" });
            }
            const { id } = req.params;
            const data = req.body;
            const updatedOrder = await orderService.updateOrder(id, data,
                token
            );
            res.status(200).json(updatedOrder);
        } catch (error) {
            res.status(500).json({
                message: "Error updating order: " + error,
            });
        }
    }
}

module.exports = new adminController();
