const express = require('express');
const router = express.Router();
const { clientsPromise, policiesPromise } = require('../data');
const { authenticateToken } = require('../auth');

const allowedRoles = ['admin'];

const checkUserRole = (req, res, next) => {
    const user = req.user;
    if (!allowedRoles.includes(user.role)) {
        return res.status(403).send('Access denied');
    }
    next();
};

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
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal server error');
    }
});


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
            (policy) => policy.clientId.toLowerCase() === user.id
        );

        if (matchedPolicies.length === 0) {
            return res.status(404).send('No policies found with the specified name');
        }

        res.status(200).json(matchedPolicies);
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal server error');
    }
});


module.exports = router;
