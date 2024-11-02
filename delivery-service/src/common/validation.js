const Joi = require("joi");

exports.createDeliveryValidation = (data) => {
    const schema = Joi.object({
        orderId: Joi.string().required(),
        userid: Joi.number().required(),
        deliveryPartnerId: Joi.number().required(),
        deliverySla: Joi.number(),
        destination: Joi.string().required(),
    });

    return schema.validate(data);
};

exports.updateDeliveryValidation = (data) => {
    const schema = Joi.object({
        deliveryPartnerId: Joi.number().optional(),
        deliverySla: Joi.number().optional(),
        destination: Joi.string().optional(),
        status: Joi.bool().optional(),
        disputeStatus: Joi.bool().optional(),
        disputeId: Joi.string().optional(),
        ratingId: Joi.string().optional()
    });

    return schema.validate(data);
};

exports.createReviewValidation = (data) => {
    const schema = Joi.object({
        rating: Joi.number().required().min(0).max(5),
        message: Joi.string().optional(),
        type: Joi.string().optional()
    });

    return schema.validate(data);
};

exports.createDisputeValidation = (data) => {
    const schema = Joi.object({
        message: Joi.string().required(),
        type: Joi.string().optional()
    });

    return schema.validate(data);
};

exports.updateDisputeValidation = (data) => {
    const schema = Joi.object({
        resolution: Joi.string().optional(),
        status: Joi.bool().optional(),
    });

    return schema.validate(data);
};

exports.locationUpdateRequest = (data) => {
    const schema = Joi.object({
        lon: Joi.string().required(),
        lat: Joi.string().required()
    });

    return schema.validate(data);
};

exports.deliveryAssignRequest = (data) => {
    const schema = Joi.object({
        userId: Joi.number().required(),
        orderId: Joi.string().required(),
        restaurantId: Joi.string().required()
    });
    return schema.validate(data);
};