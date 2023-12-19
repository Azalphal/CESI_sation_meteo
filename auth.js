import {generators, Strategy as OIDCStrategy} from "openid-client";
import { Issuer } from "openid-client";
import passport from "passport";

const express = require("express");
const app = express();
const session = require("express-session");
const passport = require("passport");

const code_verifier = generators.codeVerifier();
const code_challenge = generators.codeChallenge(code_verifier);

const googleIssuer = await Issuer.discover('https://accounts.google.com');

const User = require("./controllers/users.controller"); // VERIFIE ICI KHALIL STP

app.use(session({ secret: 'JIDOANDjnUINDUIAyd88ed6Dd-_', resave: false, saveUninitialized: true}));
app.use(passport.initialize());
app.use(passport.session());

const client = new googleIssuer.Client({
    client_id: process.env.CLIENT_ID,
    client_secret: process.env.CLIENT_SECRET,
    redirect_uris: [''],
    response_type: ['code']
});

client.authorizationUrl({
    scope: 'openid email profile',
    resource: '',
    code_challenge,
    code_challenge_method: 'S256',
});

passport.use(
    "openid-client",
    new OIDCStrategy(
        {
            issuer: "https://accounts.google.com",
            client_id: process.env.CLIENT_ID,
            client_secret: process.env.CLIENT_SECRET,
            redirect_uri: "localhost:3000/auth/callback",
            score: "openid email profile"
        },
        (issuer, sub, profile, accessToken, refreshToken, done) => {
// VERIFIE ICI AUSSI KHALIL STP, JE SUIS PAS SUR DE QUOI METTRE DANS LE CONTROLLER POUR QUE SA FONCTIONNE
        }
    )
);

passport.serializeUser((user, done) => done(null, user.id));
passport.deserializeUser((id, done) => //HERE ITS TELLING ME TO PUT CONTROLLER LOGIC (User.findByPk(id)) BUT I DONT WANT TO PUT IT HERE PLS HELP KHALIL LMAO

//const params = client.callbackParams(req);
//const tokenSet = await client.callback("https://localhost/api/auth/callback");