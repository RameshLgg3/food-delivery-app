const app = require("./app");

const PORT = process.env.PORT || 5001; // Use a different port for restaurant service

app.listen(PORT, () => {
    console.log(`Customer Service running on port ${PORT}`);
});
