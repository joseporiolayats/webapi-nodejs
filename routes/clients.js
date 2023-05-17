const express = require('express');
let { clientsPromise, policiesPromise} = require('../data');
const { authenticateToken } = require('../auth');
const data = require("../data");
const router = express.Router();

const allowedRoles = ['user', 'admin'];

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

const refreshData = () => {
    delete require.cache[require.resolve('../data')];
    const data = require('../data');
    clientsPromise = data.clientsPromise;
    policiesPromise = data.policiesPromise;
};

/**
 * Route to get user information by name.
 * @route GET /name/:name
 * @param {string} name - The name of the user.
 * @returns {object} 200 - User data.
 * @returns {Error} 403 - Access denied.
 * @returns {Error} 404 - User not found.
 * @returns {Error} 500 - Internal server error.
 */
router.get('/name/:name', authenticateToken, checkUserRole, async (req, res) => {
    try {
        if (!clientsPromise) {
            refreshData();
        }

        const name = req.params.name.toLowerCase();
        const clients = await clientsPromise;

        const user = Object.values(clients).find(
            (client) => client.name.toLowerCase() === name
        );

        if (!user) {
            return res.status(404).send('User not found');
        }

        res.status(200).json(user);

        // Clear data after 30 seconds
        setTimeout(() => {
            clientsPromise = null;
            console.log("Cleared fetched data after 30 seconds");
        }, 30000);
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal server error');
    }
});

/**
 * Route to get user information by id.
 * @route GET /id/:id
 * @param {string} id - The id of the user.
 * @returns {object} 200 - User data.
 * @returns {Error} 403 - Access denied.
 * @returns {Error} 404 - User not found.
 * @returns {Error} 500 - Internal server error.
 */
router.get('/id/:id', authenticateToken, checkUserRole, async (req, res) => {
    try {
        if (!clientsPromise) {
            refreshData();
        }

        const id = req.params.id.toLowerCase();
        const clients = await clientsPromise;

        const user = Object.values(clients).find(
            (client) => client.id.toLowerCase() === id
        );

        if (!user) {
            return res.status(404).send('User not found');
        }

        res.status(200).json(user);

        // Clear data after 30 seconds
        setTimeout(() => {
            clientsPromise = null;
            console.log("Cleared fetched data after 30 seconds");
        }, 30000);
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal server error');
    }
});

/**
 Route to get user information by email.
 @route GET /email/:email
 @param {string} email - The email of the user.
 @returns {object} 200 - User data.
 @returns {Error} 403 - Access denied.
 @returns {Error} 404 - User not found.
 @returns {Error} 500 - Internal server error.
 */
router.get('/email/:email', authenticateToken, checkUserRole, async (req, res) => {
    try {

        if (!clientsPromise) {
            refreshData();
        }

        const email = req.params.email.toLowerCase();
        const clients = await clientsPromise;
        const user = Object.values(clients).find(
            (client) => client.email.toLowerCase() === email
        );

        if (!user) {
            return res.status(404).send('User not found');
        }

        res.status(200).json(user);

        // Clear data after 30 seconds
        setTimeout(() => {
            clientsPromise = null;
            console.log("Cleared fetched data after 30 seconds");
        }, 30000);
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal server error');
    }
});

/**
 Route to get users by role.
 @route GET /role/:role
 @param {string} role - The role of the user.
 @returns {object} 200 - Users data.
 @returns {Error} 403 - Access denied.
 @returns {Error} 404 - No users found with the specified role.
 @returns {Error} 500 - Internal server error.
 */
router.get('/role/:role', authenticateToken, checkUserRole, async (req, res) => {
    try {
        if (!clientsPromise) {
            refreshData();
        }

        const role = req.params.role.toLowerCase();
        const clients = await clientsPromise;
        const matchedUsers = Object.values(clients).filter(
            (client) => client.role.toLowerCase() === role
        );

        if (matchedUsers.length === 0) {
            return res.status(404).send('No users found with the specified role');
        }

        res.status(200).json(matchedUsers);

        // Clear data after 30 seconds
        setTimeout(() => {
            clientsPromise = null;
            console.log("Cleared fetched data after 30 seconds");
        }, 30000);
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal server error');
    }
});

module.exports = router;