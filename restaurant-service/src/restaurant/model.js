// src/models/restaurantModel.js
const prisma = require("./prismaClient");

// Define Restaurant and FoodItem models as objects to be imported by repository if needed
const Restaurant = prisma.restaurant;
const FoodItem = prisma.food_item;

module.exports = {
    Restaurant,
    FoodItem,
};
