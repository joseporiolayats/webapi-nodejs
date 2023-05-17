const express = require('express');
const router = express.Router();
const { clientsPromise } = require('../data');
const { authenticateToken } = require('../auth');

const allowedRoles = ['user', 'admin'];

const checkUserRole = (req, res, next) => {
  const user = req.user;
  if (!allowedRoles.includes(user.role)) {
    return res.status(403).send('Access denied');
  }
  next();
};

router.get('/name/:name', authenticateToken, checkUserRole, async (req, res) => {
  try {
    const name = req.params.name.toLowerCase();
    const clients = await clientsPromise;

    const user = Object.values(clients).find(
        (client) => client.name.toLowerCase() === name
    );

    if (!user) {
      return res.status(404).send('User not found');
    }

    res.status(200).json(user);
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal server error');
  }
});

router.get('/id/:id', authenticateToken, checkUserRole, async (req, res) => {
  try {
    const id = req.params.id.toLowerCase();
    const clients = await clientsPromise;

    const user = Object.values(clients).find(
        (client) => client.id.toLowerCase() === id
    );

    if (!user) {
      return res.status(404).send('User not found');
    }

    res.status(200).json(user);
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal server error');
  }
});


router.get('/email/:email', authenticateToken, checkUserRole, async (req, res) => {
  try {
    const email = req.params.email.toLowerCase();
    const clients = await clientsPromise;

    const user = Object.values(clients).find(
        (client) => client.email.toLowerCase() === email
    );

    if (!user) {
      return res.status(404).send('User not found');
    }

    res.status(200).json(user);
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal server error');
  }
});


router.get('/role/:role', authenticateToken, checkUserRole, async (req, res) => {
  try {
    const role = req.params.role.toLowerCase();
    const clients = await clientsPromise;

    const matchedUsers = Object.values(clients).filter(
        (client) => client.role.toLowerCase() === role
    );

    if (matchedUsers.length === 0) {
      return res.status(404).send('No users found with the specified role');
    }

    res.status(200).json(matchedUsers);
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal server error');
  }
});


module.exports = router;
