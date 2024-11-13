const express = require("express");
const {
    createRestaurant,
    addFoodItems,
    getAllRestaurants,
    getRestaurantWithFoodItems,
    getFoodItemsByRestaurantId,
} = require("./controller");

const restaurantRoutes = express.Router();

const { authenticateToken, authorizeRoles } = require("./middleware");

// Apply the authentication middleware to all routes
restaurantRoutes.use(authenticateToken);

// Apply the role-based access control for the CUSTOMER role to all order-related routes
restaurantRoutes.use(authorizeRoles("CUSTOMER", "RESTAURANT"));

// Route to create a restaurant
restaurantRoutes.post("/restaurants", createRestaurant);

// Route to get all restaurants
restaurantRoutes.get("/restaurants", getAllRestaurants);

// Route to add food items to a restaurant
restaurantRoutes.post("/restaurants/:restaurant_id/food-items", addFoodItems);

// Route to get a single restaurant with its food items
restaurantRoutes.get("/:restaurant_id", getRestaurantWithFoodItems);

// Route to get food items by restaurant_id
restaurantRoutes.get(
    "/restaurants/:restaurant_id/food-items",
    getFoodItemsByRestaurantId
);

module.exports = restaurantRoutes;
