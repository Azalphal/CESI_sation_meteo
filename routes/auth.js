const express = require('express');
const router = express.Router();
//const {registerUser, loginUser} = require('../models/db.model');

router.post('/register', async (req, res) => {
    const {username, password} = req.body;

    try {
        await registerUser(username, password);

        res.status(201).send('User registered successfully.');
    } catch (err) {
        console.error(err);
        res.status(500).send('Internal Server Error.');
    }
});

router.post('/login', async (req, res) => {
    const {username, password} = req.body;

    try {
        await loginUser(username, password);

        res.status(201).send('User logged in successfully.');
    } catch (err) {
        console.error(err);
        res.status(500).send('Internal Server Error.');
    }
});

router.get('/logout', (req, res) => {
    try {
        req.logout();
        res.redirect('/');
    } catch (err) {
        console.error(err);
        res.status(500).send('Internal Server Error.');
    }
});

module.exports = router;
