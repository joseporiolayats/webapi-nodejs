const Joi = require('joi');

/**
 * @typedef {Object} Client
 * @property {string} id - The unique ID of the client. This is required.
 * @property {string} name - The name of the client. This is required.
 * @property {string} email - The email of the client. This is required and must be a valid email.
 * @property {string} role - The role of the client. This is required and must be either 'admin' or 'user'.
 */

/**
 * The Joi schema for the Client type. This is used for validation.
 * @type {Joi.ObjectSchema<Client>}
 */
const clientSchema = Joi.object({
    id: Joi.string().required(),
    name: Joi.string().required(),
    email: Joi.string().email().required(),
    role: Joi.string().valid('admin', 'user').required(),
});

/**
 * @typedef {Object} Policy
 * @property {string} id - The unique ID of the policy. This is required and must be a UUID.
 * @property {number} amountInsured - The amount insured by the policy. This is required.
 * @property {string} email - The email of the policy. This is required and must be a valid email.
 * @property {string} inceptionDate - The date the policy was incepted. This is required and must be a valid ISO date.
 * @property {boolean} installmentPayment - Whether the policy is paid in installments. This is required.
 * @property {string} clientId - The ID of the client the policy is associated with. This is required and must be a UUID.
 */

/**
 * The Joi schema for the Policy type. This is used for validation.
 * @type {Joi.ObjectSchema<Policy>}
 */
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
