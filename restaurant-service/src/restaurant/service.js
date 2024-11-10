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

module.exports = {
    createRestaurant,
    addFoodItems,
    getAllRestaurants,
    getRestaurantWithFoodItems,
    getFoodItemsByRestaurantId,
};
