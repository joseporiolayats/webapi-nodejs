const axios = require('axios');
const { clientSchema, policiesSchema } = require('./schemas');


/**
 * Fetches data from the specified URL.
 *
 * @param {string} url - The URL to fetch data from.
 * @returns {Promise<any>} - A promise that resolves with the fetched data.
 * @throws {Error} - If there is an error fetching the data.
 */
const fetchData = async (url) => {
    try {
        const response = await axios.get(url);
        return response.data;
    } catch (error) {
        console.error(`Error fetching data: ${error}`);
        throw error;
    }
};

/**
 * Validates the data fetched from the specified URL against the provided schema.
 *
 * @param {string} url - The URL to fetch data from.
 * @param {object} schema - The Joi schema for data validation.
 * @param {string} name - The name of the data (for logging purposes).
 * @returns {Promise<object>} - A promise that resolves with the validated data.
 * @throws {Error} - If there is an error during data validation.
 */
const validateData = async (url, schema, name) => {
    const data = await fetchData(url);
    const validatedData = {};

    for (const key of Object.keys(data[name])) {

        const obj = data[name][key];
        const { error, value } = schema.validate(obj);

        if (error) {
            console.error(`Validation error for ${name}: ${error.details[0].message}`);
            throw error;
        }

        validatedData[key] = value;
    }

    return validatedData;
};

const urlClients = process.env.URLCLIENTS;
const urlPolicies = process.env.URLPOLICIES;
const nameClients = 'clients';
const namePolicies = 'policies';

const clientsPromise = validateData(urlClients, clientSchema, nameClients)
    .then((data) => {
        console.log(`Fetched and validated ${nameClients}`);
        // console.log(data)
        return data;
    })
    .catch((error) => console.error(error));

const policiesPromise = validateData(urlPolicies, policiesSchema, namePolicies)
    .then((data) => {
        console.log(`Fetched and validated ${namePolicies}`);
        return data;
    })
    .catch((error) => console.error(error));

module.exports = {
    clientsPromise,
    policiesPromise,
};
