// src/services/restaurantService.js
const axios = require("axios");

// Set the base URL for restaurant-service
const ORDER_SERVICE_URL =
    process.env.ORDER_SERVICE_URL || "http://localhost:5001/api";

class orderService {
// Function to get all Orders
async getAllOrders (token) {
    try {
        const response = await axios.get(
            `${ORDER_SERVICE_URL}/orders`,
            {
                headers: { Authorization: token },
            }
        );
        return response.data;
    } catch (error) {
        console.error(
            "Error fetching orders from customer-service:",
            error.message
        );
        throw new Error("Could not fetch orders");
    }
};

// Function to get all Orders
async getOrderById (id, token) {
    try {
        const response = await axios.get(
            `${ORDER_SERVICE_URL}/orders/${id}`,
            {
                headers: { Authorization: token },
            }
        );
        return response.data;
    } catch (error) {
        console.error(
            "Error fetching order from customer-service:",
            error.message
        );
        throw new Error("Could not fetch order");
    }
};

// Function to get all Orders
async updateOrder (id,data, token) {
    try {
        const response = await axios.put(
            `${ORDER_SERVICE_URL}/orders/${id}`,
            {
                headers: { Authorization: token },
                body: data
            }
        );
        return response.data;
    } catch (error) {
        console.error(
            "Error in updating order in customer-service:",
            error.message
        );
        throw new Error("Error in updating order");
    }
};

}
module.exports = new orderService();
