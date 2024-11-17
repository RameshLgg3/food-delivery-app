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

// Controller function to add menu to a restaurant
const addFoodItems = async (req, res) => {
    const restaurant_id = req.user.id;
    const foodItems = req.body.menu;

    try {
        await restaurantService.addFoodItems(foodItems);
        res.status(201).json({ message: "Menu added successfully" });
    } catch (error) {
        console.error("Error adding menu:", error);
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

const updateRestaurant = async (req, res) => {
    const { id } = req.params; // Get the restaurant ID from the route parameter
    const updateData = req.body; // Get the data to update from the request body

    try {
        // Call the service method to update the restaurant
        const updatedRestaurant = await restaurantService.updateRestaurant(
            id,
            updateData
        );

        if (!updatedRestaurant) {
            return res.status(404).json({ message: "Restaurant not found" });
        }

        // Respond with the updated restaurant data
        res.status(200).json(updatedRestaurant);
    } catch (error) {
        console.error("Error updating restaurant:", error);
        res.status(500).json({ message: "Internal Server Error" });
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
    updateRestaurant,
};
