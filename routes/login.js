const express = require('express');
const router = express.Router();
const { authenticateUser } = require('../auth');

/**
 * Login route handler.
 *
 * @route POST /login
 * @group Authentication - Operations related to user authentication.
 * @param {string} email.body.required - The email of the user - eg: "user@example.com"
 * @param {string} password.body.required - The password of the user
 * @produces {application/json}
 * @returns {Object} 200 - An object containing a boolean indicating authentication success and a JWT
 * @returns {Error}  400 - Email and password must be provided
 * @returns {Error}  400 - No user with the provided email
 * @returns {Error}  401 - Password not valid
 * @returns {Error}  500 - Internal server error
 */
router.post('/', authenticateUser);

module.exports = router;
