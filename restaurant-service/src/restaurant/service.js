const restaurantRepository = require("./repository");

const createRestaurant = async (data) => {
    try {
        return await restaurantRepository.createRestaurant(data);
    } catch (error) {
        console.error("Error in createRestaurant service:", error);
        throw new Error("Error creating restaurant");
    }
};

const addFoodItems = async (restaurant_id, foodItems) => {
    try {
        return await restaurantRepository.addFoodItems(
            restaurant_id,
            foodItems
        );
    } catch (error) {
        console.error("Error in addFoodItems service:", error);
        throw new Error("Error adding food items");
    }
};

const getAllRestaurants = async () => {
    try {
        return await restaurantRepository.getAllRestaurants();
    } catch (error) {
        console.error("Error in getAllRestaurants service:", error);
        throw new Error("Error fetching restaurants");
    }
};

const getRestaurantWithFoodItems = async (restaurant_id) => {
    try {
        return await restaurantRepository.getRestaurantWithFoodItems(
            restaurant_id
        );
    } catch (error) {
        console.error("Error in getRestaurantWithFoodItems service:", error);
        throw new Error("Error fetching restaurant and its food items");
    }
};

const getFoodItemsByRestaurantId = async (restaurant_id) => {
    try {
        return await restaurantRepository.getFoodItemsByRestaurantId(
            restaurant_id
        );
    } catch (error) {
        console.error("Error in getFoodItemsByRestaurantId service:", error);
        throw new Error("Error fetching food items");
    }
};

const getFoodItemsBySearch = async (searchQuery) => {
    try {
        if (!searchQuery) {
            throw new Error("Search query cannot be empty");
        }
        return await restaurantRepository.getFoodItemsBySearch(searchQuery);
    } catch (error) {
        console.error("Error in getFoodItemsBySearch service:", error);
        throw new Error("Error fetching food items");
    }
};

const getRestaurantsBySearch = async (searchQuery) => {
    try {
        if (!searchQuery) {
            throw new Error("Search query cannot be empty");
        }
        return await restaurantRepository.getRestaurantsBySearch(searchQuery);
    } catch (error) {
        console.error("Error in getRestaurantsBySearch service:", error);
        throw new Error("Error fetching restaurants");
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
