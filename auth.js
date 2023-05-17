const jwt = require('jsonwebtoken');
const _ = require('lodash');
const { clientsPromise } = require('./data');

/**
 * Authenticates a user and returns a JWT.
 *
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @returns {void}
 */
const authenticateUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).send('Email and password must be provided');
        }

        // Wait for the clients Promise to resolve
        const clients = await clientsPromise;

        // Use lodash's values function to convert the object of objects to an array of objects
        const clientsArray = _.values(clients);

        const user = _.find(clientsArray, { email });

        if (!user) {
            return res.status(400).send('No user with the provided email');
        }

        if (password !== user.id) {
            return res.status(401).send('Password not valid');
        }

        const { id, role } = user;

        const token = jwt.sign(
            { id, email: user.email, role },
            process.env.JWT_SECRET, // Use JWT secret from environment variables
            {
                expiresIn: 86400, // expires in 24 hours
            }
        );

        res.status(200).send({ token });
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal server error');
    }
};

const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (token == null) return res.sendStatus(401);

    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if (err) return res.sendStatus(403);
        req.user = user;
        next();
    });
}

module.exports = {
    authenticateUser,
    authenticateToken
};
