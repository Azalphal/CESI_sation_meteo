const express = require("express");
const swaggerUi = require("swagger-ui-express");
const path = require("path");
const app = express();
const cors = require('cors');

const authRouter = require("./routes/auth.routes");
const dataRouter = require("./routes/data.routes");
const usersRouter = require("./routes/users.routes");
const probesRouter = require("./routes/probes.routes");

const passport = require("passport");
const OIDC = require("./middleware/oidc");
const expressSession = require("express-session");

const {ensureAuthenticated, ensureAuthenticatedApi} = require("./middleware/auth");
const {Sequelize} = require("sequelize");
const config = require("./config/config");
const swaggerDocument = require("./config/swagger-config");

app.use(express.urlencoded({extended: true}));

app.use(express.json());

app.use(express.static(path.join(__dirname, 'public')));

app.options("*", cors(["http://localhost:3000", "http://127.0.0.1:3000"]));
app.use(
    expressSession({
        secret: "keyboard cat",
        resave: false,
        saveUninitialized: true
    })
);

app.use(passport.initialize());
app.use(passport.session({}));

const sequelize = new Sequelize(config.development.database, config.development.username, config.development.password, {
    host: config.development.host,
    dialect: config.development.dialect
});

sequelize
    .authenticate()
    .then(() => {
        console.log("Database connection has been established successfully.");
    })
    .catch(err => {
        console.error("Unable to connect to the database:", err);
    });
OIDC.then(() => {
    app.options('*', cors(["http://localhost:3000", "http://127.0.0.1:3000"]))
    app.use("/", authRouter);
    app.use("/api/data", /*ensureAuthenticatedApi,*/ dataRouter);
    app.use("/api/users", ensureAuthenticatedApi, usersRouter);
    app.use("/api/probes", ensureAuthenticatedApi, probesRouter);
    app.use("/api/docs", swaggerUi.serve);
    app.get("/api/docs", swaggerUi.setup(swaggerDocument));
});


app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, "public/views", "acceuil.html"));
});

app.get('/acceuil.html', (req, res) => {
    res.sendFile(path.join(__dirname, "public/views", "acceuil.html"));
});

app.get('/historique.html', ensureAuthenticated,(req, res) => {
    res.sendFile(path.join(__dirname, "public/views", "historique.html"));
});

app.get('/carte.html', ensureAuthenticated,(req, res) => {
    res.sendFile(path.join(__dirname, "public/views", "carte.html"));
});

module.exports = app;
