// src/services/restaurantService.js
const axios = require("axios");

// Set the base URL for restaurant-service
const RESTAURANT_SERVICE_URL =
    process.env.RESTAURANT_SERVICE_URL || "http://localhost:5003/api";

// Function to get all restaurants
const getAllRestaurants = async (token) => {
    try {
        const response = await axios.get(
            `${RESTAURANT_SERVICE_URL}/restaurants`,
            {
                headers: { Authorization: token },
            }
        );
        return response.data;
    } catch (error) {
        console.error(
            "Error fetching restaurants from restaurant-service:",
            error.message
        );
        throw new Error("Could not fetch restaurants");
    }
};

// Function to search restaurants
const searchRestaurants = async (token, keyword) => {
    try {
        const response = await axios.get(
            `${RESTAURANT_SERVICE_URL}/restaurants/search?keyword=${keyword}`,
            {
                headers: { Authorization: token },
            }
        );
        return response.data;
    } catch (error) {
        console.error(
            "Error searching restaurants from restaurant-service:",
            error.message
        );
        throw new Error("Could not search restaurants");
    }
};

// Function to search menu
const searchMenu = async (token, keyword) => {
    try {
        const response = await axios.get(
            `${RESTAURANT_SERVICE_URL}/menu/search?keyword=${keyword}`,
            {
                headers: { Authorization: token },
            }
        );
        return response.data;
    } catch (error) {
        console.error(
            "Error searching menu from restaurant-service:",
            error.message
        );
        throw new Error("Could not search menu");
    }
};

module.exports = { getAllRestaurants, searchRestaurants, searchMenu };
