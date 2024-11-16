const express = require("express");
const { authenticateToken } = require("../common/middleware");
const {getDeliveryController, createDeliveryController, updateDeliveryController, createReviewController,
    createDisputeController, updateDisputeController
} = require("./controller"); // Import the JWT middleware

const router = express.Router();

router.post("/", authenticateToken, createDeliveryController);
router.post("/:id", authenticateToken, updateDeliveryController);
router.post("/review/:id", authenticateToken, createReviewController);
router.post("/dispute/:id", authenticateToken, createDisputeController);
router.post("/dispute/:id/update", authenticateToken, updateDisputeController);
router.get("/:id",authenticateToken, getDeliveryController);

router.get("/status", (req, res) => {
    res.send({
        status: true,
        message: "Delivery service is up and running",
    });
});
module.exports = router;
