const app = require("./app");

const PORT = process.env.PORT || 5003; // Use a different port for restaurant service

app.listen(PORT, () => {
    console.log(`Restaurant Service running on port ${PORT}`);
});
