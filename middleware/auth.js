function ensureAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    res.redirect("/auth");
}

function ensureAuthenticatedApi(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    res.status(401).json({error: 'Unauthorized'});
}

module.exports = {ensureAuthenticated, ensureAuthenticatedApi};