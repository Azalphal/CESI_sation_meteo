const {Issuer, Strategy} = require("openid-client");
const passport = require('passport');
const models = require('../models');
const User = models.User;

const OIDC = Issuer.discover('https://accounts.google.com')
    .then(issuer => {
        const client = new issuer.Client({
            client_id: "653131607313-tvd9v3174gjbq97ookoc6h4d5dvfhfml.apps.googleusercontent.com",
            client_secret: "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",
            redirect_uris: ['http://localhost:3000/auth/callback'],
            post_logout_redirect_uris: ['http://localhost:3000/logout/callback'],
            token_endpoint_auth_method: 'client_secret_post'
        });

        passport.use(
            'oidc',
            new Strategy({ client, params : { scope: 'openid profile email'} }, (tokenSet, userinfo, done) => {
                return done(null, {userinfo, claims: tokenSet.claims()});
            })
        );

        // handles serialization and deserialization of authenticated user
        passport.serializeUser((oidcUser, done) => {
//            done(null, oidcUser);
            User.findOne({where: {email: oidcUser.userinfo.email}, rejectOnEmpty: true})
                .then((result) => done(null, result))
                .catch(() =>
                    User.build({username: oidcUser.userinfo.email, email: oidcUser.userinfo.email})
                        .save()
                        .then(result => done(null, result)));
        });

        passport.deserializeUser((user, done) => {
            done(null, user);
        });
    });

module.exports=OIDC;