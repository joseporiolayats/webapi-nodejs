const Joi = require('joi');

// Define the client schema
const clientSchema = Joi.object({
    id: Joi.string().required(),
    name: Joi.string().required(),
    email: Joi.string().email().required(),
    role: Joi.string().valid('admin', 'user').required(),
});


// Define the schema
const policiesSchema = Joi.object({
    id: Joi.string().uuid().required(),
    amountInsured: Joi.number().required(),
    email: Joi.string().email().required(),
    inceptionDate: Joi.string().isoDate().required(),
    installmentPayment: Joi.boolean().required(),
    clientId: Joi.string().uuid().required()
});

module.exports = {
    clientSchema,
    policiesSchema,
};