const express = require("express");
const { authenticateToken } = require("../common/middleware");
const { updateLocationController, getLocationController,
    assignDeliveryController
} = require("./controller"); // Import the JWT middleware

const router = express.Router();

router.post("/", authenticateToken, updateLocationController);
router.post("/assign", authenticateToken, assignDeliveryController);
router.get("/:type/:id",authenticateToken, getLocationController);

router.get("/status", (req, res) => {
    res.send({
        status: true,
        message: "Location service is up and running",
    });
});


module.exports = router;
