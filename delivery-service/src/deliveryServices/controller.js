const {findDeliveryById, createDelivery, updateDelivery, createReview, createDispute, updateDispute} = require("./repository");
const {createDeliveryValidation, updateDeliveryValidation, createReviewValidation, createDisputeValidation,
    updateDisputeValidation
} = require("../common/validation");
const {HTTP_SUCCESS, HTTP_BAD_REQUEST} = require("../common/http_error");
exports.getDeliveryController = async (req, res) => {
    let searchKey = "deliveryid"
    // Validate request data
    if(!req.params.id) {
        return res.status(400).json({  status:false, message: "invalid delivery id" });
    }
    try {
        const result = await findDeliveryById(req.params.id);
        return res
            .status(HTTP_SUCCESS)
            .json({ status:true, message: "Successfully retrieved the data", data: result });

    } catch {
        return res
            .status(HTTP_BAD_REQUEST)
            .json({ status:false, message: "Failed to retrieve the data" });
    }
};

exports.createDeliveryController = async (req, res) => {
    // Validate request data
    if(!req.body) {
        return res.status(400).json({  status:false, message: "invalid delivery request " });
    }
    const { error } = createDeliveryValidation(req.body);
    if (error) {
        return res.status(400).json({  status:false, message: error.details[0].message});
    }

    try {
        const result = await createDelivery(req.body).catch((err) => {
            console.log(err)
        });
        return res
            .status(HTTP_SUCCESS)
            .json({ status: true, message: "Successfully created the delivery details", data: result });
    } catch {
        return res
            .status(HTTP_BAD_REQUEST)
            .json({ status:false,  message: "Failed to create delivery details" });
    }

};

exports.updateDeliveryController = async (req, res) => {
    // Validate request data
    if(!req.body) {
        return res.status(400).json({  status:false, message: "invalid delivery update request" });
    }
    const { error } = updateDeliveryValidation(req.body);
    if (error) {
        return res.status(400).json({ status:false,message: error.details[0].message});
    }

    const {deliverySla, destination, status, disputeStatus, disputeId, ratingId, deliveryPartnerId} = req.body
    try {

        const deliveryObject = await findDeliveryById(req.params.id);


        if(!deliveryObject) {
            return res.status(400).json({  status:false, message: "not able to find any delivery" });
        }

        if(deliverySla) {
            deliveryObject.deliverySla = deliverySla;
        }

        if(deliveryPartnerId) {
            deliveryObject.deliveryPartnerId = deliveryPartnerId;
        }


        if(destination) {
            deliveryObject.destination = destination;
        }

        if(disputeStatus) {
            deliveryObject.disputeStatus = disputeStatus;
        }

        if(status) {
            deliveryObject.status = status;
        }

        delete deliveryObject.rating
        delete deliveryObject.dispute

        console.log(deliveryObject)

        const result = await updateDelivery(deliveryObject).catch((err) => {
            console.log(err)
        });

        return res
            .status(HTTP_SUCCESS)
            .json({ status: true, message: "Successfully updated the delivery details", data: result });
    } catch {
        return res
            .status(HTTP_BAD_REQUEST)
            .json({ status:false,  message: "Failed to update delivery details" });
    }

};

exports.createReviewController = async (req, res) => {
    // Validate request data
    if(!req.body || !req.params.id) {
        return res.status(400).json({  status:false, message: "invalid review request " });
    }
    const { error } = createReviewValidation(req.body);
    if (error) {
        return res.status(400).json({ status:false, message: error.details[0].message});
    }

    if (!req.body.type) {
      req.body.type = "delivery"
    }


    try {
        const deliveryObject = await findDeliveryById(req.params.id);
        req.body.deliveryId = deliveryObject.id

        console.log(deliveryObject)

        if(!deliveryObject.status) {
            return res.status(400).json({ status:false, message: "this order is not yet delivered" });
        }

        const result = await createReview(req.body).catch((err) => {
            console.log(err)
        });


        return res
            .status(HTTP_SUCCESS)
            .json({ status: true, message: `Successfully reviewed the ${req.body.type}`, data: result });
    } catch {
        return res
            .status(HTTP_BAD_REQUEST)
            .json({ status:false,  message: `Failed to update the review for ${req.body.type}` });
    }

};

exports.createDisputeController = async (req, res) => {
    // Validate request data
    if(!req.body || !req.params.id) {
        return res.status(400).json({  status:false, message: "invalid dispute request " });
    }

    const { error } = createDisputeValidation(req.body);
    if (error) {
        return res.status(400).json({ status:false, message: error.details[0].message});
    }

    if (!req.body.type) {
        req.body.type = "delivery"
    }


    try {
        const deliveryObject = await findDeliveryById(req.params.id);

        req.body.deliveryId = deliveryObject.id

        const result = await createDispute(req.body).catch((err) => {
            console.log(err)
        });

        if(!deliveryObject.status) {
            return res.status(400).json({ status:false, message: "this order is not yet delivered" });
        }

        return res
            .status(HTTP_SUCCESS)
            .json({ status: true, message: `Successfully raised dispute the ${req.body.type}`, data: result });
    } catch {
        return res
            .status(HTTP_BAD_REQUEST)
            .json({ status:false,  message: `Failed to update the dispute for ${req.body.type}` });
    }

};

exports.updateDisputeController = async (req, res) => {
    // Validate request data
    if(!req.body) {
        return res.status(400).json({  status:false, message: "invalid dispute update request" });
    }
    const { error } = updateDisputeValidation(req.body);
    if (error) {
        return res.status(400).json({ status:false,message: error.details[0].message});
    }

    const {resolution, status} = req.body
    try {

        const deliveryObject = await findDeliveryById(req.params.id);


        if(!deliveryObject) {
            return res.status(400).json({  status:false, message: "not able to find any delivery" });
        }

        if(resolution) {
            deliveryObject.dispute.resolution = resolution;
        }

        if(status) {
            deliveryObject.dispute.status = status;
        } else {
            deliveryObject.dispute.status = false;
        }

        const result = await updateDispute(deliveryObject.dispute).catch((err) => {
            console.log(err)
        });

        return res
            .status(HTTP_SUCCESS)
            .json({ status: true, message: "Successfully updated the delivery details", data: result });
    } catch {
        return res
            .status(HTTP_BAD_REQUEST)
            .json({ status:false,  message: "Failed to update delivery details" });
    }

};
