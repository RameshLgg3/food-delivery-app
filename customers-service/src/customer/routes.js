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
router.post("/orders", orderController.createOrder);

// Get all orders
router.get("/orders", orderController.getAllOrders);

// Get order by ID
router.get("/orders/:id", orderController.getOrderById);

router.get("/restaurants", orderController.fetchRestaurants);
router.get("/restaurants/search", orderController.searchRestaurants);
router.get("/menu/search", orderController.searchMenu);
router.post("/orders/:order_number/reorder", orderController.reOrder);

module.exports = router;
