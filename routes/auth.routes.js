const express = require("express");
const router = express.Router();
const passport = require('passport')

router.get('/auth', (req, res, next) => {
    passport.authenticate('oidc', { acr_values: 'urn:grn:authn:no:bankid' }) (req, res, next);
});

router.get('/auth/callback', (req, res, next) => {
    passport.authenticate('oidc', {
        successRedirect: '/acceuil.html',
        failureRedirect: '/'
    })(req, res, next);
});

router.get('/logout/callback', (req, res) => {
    // clears the persisted user from the local storage
    req.logout();
    // redirects the user to a public route
    res.redirect('/');
});

module.exports = router;