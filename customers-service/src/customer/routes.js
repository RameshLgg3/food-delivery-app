// src/customer/routes.js
const express = require("express");
const orderController = require("./controller");
const { authenticateToken, authorizeRoles } = require("./middleware");

const router = express.Router();

// Apply the authentication middleware to all routes
router.use(authenticateToken);

// Apply the role-based access control for the CUSTOMER role to all order-related routes
router.use(authorizeRoles("CUSTOMER"));

// Hello World endpoint (accessible by any authenticated user)
router.get("/customers", (req, res) => {
    res.json({ message: "Hello from Customer Service!" });
});

// Create an order
router.post("/api/orders", orderController.createOrder);

// Get all orders
router.get("/api/orders", orderController.getAllOrders);

// Get order by ID
router.get("/api/orders/:id", orderController.getOrderById);

// Update order status and delivery status
router.patch("/api/orders/:id", orderController.updateOrder);

router.get("/api/restaurants", orderController.fetchRestaurants);
router.get("/api/restaurants/search", orderController.searchRestaurants);
router.get("/api/menu/search", orderController.searchMenu);

module.exports = router;
