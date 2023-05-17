const express = require('express');
const router = express.Router();
let { clientsPromise, policiesPromise } = require('../data');
const { authenticateToken } = require('../auth');

const allowedRoles = ['admin'];

/**
 * Middleware to check if the authenticated user's role is included in the allowed roles.
 * @param {object} req - Express request object.
 * @param {object} res - Express response object.
 * @param {function} next - Express next middleware function.
 */
const checkUserRole = (req, res, next) => {
    const user = req.user;
    if (!allowedRoles.includes(user.role)) {
        return res.status(403).send('Access denied');
    }
    next();
};

/**
 * Route to get user information by policy id.
 * @route GET /by_policy/:id
 * @param {string} id - The id of the policy.
 * @returns {object} 200 - User data corresponding to the policy id.
 * @returns {Error} 403 - Access denied.
 * @returns {Error} 404 - Policy or User not found.
 * @returns {Error} 500 - Internal server error.
 */
router.get('/by_policy/:id', authenticateToken, checkUserRole, async (req, res) => {
    try {
        const id = req.params.id.toLowerCase();
        const clients = await clientsPromise;
        const policies = await policiesPromise;

        const policy = Object.values(policies).find(
            (policy_info) => policy_info.id.toLowerCase() === id
        );

        const user = Object.values(clients).find(
            (client) => client.id.toLowerCase() === policy.clientId
        );

        if (!policy) {
            return res.status(404).send('Policy not found');
        }

        if (!user) {
            return res.status(404).send('User not found');
        }

        res.status(200).json(user);

        // Clear data after 30 seconds
        setTimeout(() => {
            clientsPromise = null;
            policiesPromise = null;
            console.log("Cleared fetched data after 30 seconds");
        }, 30000);
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal server error');
    }
});

/**
 * Route to get policies by client name.
 * @route GET /by_client_name/:name
 * @param {string} name - The name of the client.
 * @returns {object} 200 - Policies corresponding to the client name.
 * @returns {Error} 403 - Access denied.
 * @returns {Error} 404 - User or Policies not found.
 * @returns {Error} 500 - Internal server error.
 */
router.get('/by_client_name/:name', authenticateToken, checkUserRole, async (req, res) => {
    try {
        const name = req.params.name.toLowerCase();
        const clients = await clientsPromise;
        const policies = await policiesPromise;

        const user = Object.values(clients).find(
            (client) => client.name.toLowerCase() === name
        );

        if (!user) {
            return res.status(404).send('User not found');
        }

        const matchedPolicies = Object.values(policies).filter(
            (policy) =>policy.clientId.toLowerCase() === user.id
        );

        if (matchedPolicies.length === 0) {
            return res.status(404).send('No policies found with the specified name');
        }

        res.status(200).json(matchedPolicies);

        // Clear data after 30 seconds
        setTimeout(() => {
            clientsPromise = null;
            policiesPromise = null;
            console.log("Cleared fetched data after 30 seconds");
        }, 30000);
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal server error');
    }
});

module.exports = router;
