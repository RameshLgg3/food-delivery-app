const Joi = require("joi");

exports.registerValidation = (data) => {
    const schema = Joi.object({
        email: Joi.string().email().required(),
        name: Joi.string().required(),
        mobileNumber: Joi.number().min(1000000000).max(9999999999).required(),
        userType: Joi.string(),
        password: Joi.string().min(6).required(),
    });

    return schema.validate(data);
};

exports.loginValidation = (data) => {
    const schema = Joi.object({
        email: Joi.string().email().required(),
        password: Joi.string().min(6).required(),
    });

    return schema.validate(data);
};
