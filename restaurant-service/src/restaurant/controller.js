const restaurantService = require("./service");

// Controller function to create a restaurant
const createRestaurant = async (req, res) => {
    try {
        const restaurant = await restaurantService.createRestaurant(req.body);
        res.status(201).json(restaurant);
    } catch (error) {
        console.error("Error creating restaurant:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};

// Controller function to add food items to a restaurant
const addFoodItems = async (req, res) => {
    const { restaurant_id } = req.params;
    const foodItems = req.body.food_items;

    try {
        await restaurantService.addFoodItems(
            parseInt(restaurant_id),
            foodItems
        );
        res.status(201).json({ message: "Food items added successfully" });
    } catch (error) {
        console.error("Error adding food items:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};

// Get all restaurants
const getAllRestaurants = async (req, res) => {
    try {
        const restaurants = await restaurantService.getAllRestaurants();
        res.json({ data: restaurants });
    } catch (error) {
        res.status(500).json({ message: "Error fetching restaurants" });
    }
};

// Get a single restaurant with its food items by restaurant_id
const getRestaurantWithFoodItems = async (req, res) => {
    const { restaurant_id } = req.params;
    try {
        const restaurant = await restaurantService.getRestaurantWithFoodItems(
            restaurant_id
        );
        if (!restaurant) {
            return res.status(404).json({ message: "Restaurant not found" });
        }
        res.json(restaurant);
    } catch (error) {
        res.status(500).json({
            message: "Error fetching restaurant and its food items",
        });
    }
};

// Get food items by restaurant_id
const getFoodItemsByRestaurantId = async (req, res) => {
    const { restaurant_id } = req.params;
    try {
        const foodItems = await restaurantService.getFoodItemsByRestaurantId(
            restaurant_id
        );
        res.json(foodItems);
    } catch (error) {
        console.error("Error fetching food items:", error);
        res.status(500).json({ message: "Error fetching food items" });
    }
};

// Search food items
const getFoodItemsBySearch = async (req, res) => {
    try {
        const { keyword } = req.query;
        const foodItems = await restaurantService.getFoodItemsBySearch(keyword);
        res.status(200).json({ success: true, data: foodItems });
    } catch (error) {
        console.error("Error searching food items:", error);
        res.status(500).json({ message: "Error searching food items" });
    }
};

// Search restaurants
const getRestaurantsBySearch = async (req, res) => {
    try {
        const { keyword } = req.query;
        const foodItems = await restaurantService.getRestaurantsBySearch(
            keyword
        );
        res.status(200).json({ success: true, data: foodItems });
    } catch (error) {
        console.error("Error searching restaurants:", error);
        res.status(500).json({ message: "Error searching restaurants" });
    }
};

module.exports = {
    createRestaurant,
    addFoodItems,
    getAllRestaurants,
    getRestaurantWithFoodItems,
    getFoodItemsByRestaurantId,
    getFoodItemsBySearch,
    getRestaurantsBySearch,
};
