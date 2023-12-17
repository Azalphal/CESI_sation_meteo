const express = require("express");
const path = require("path");
const app = express();

const dataRouter = require("./routes/data.routes");
const usersRouter = require("./routes/users.routes");
const probesRouter = require("./routes/probes.routes");

const ensureAuthenticated = require("./middleware/auth");
const {Sequelize} = require("sequelize");
const config = require("./config/config");

app.use(express.urlencoded({extended: true}));

app.use(express.json());

app.use(express.static(path.join(__dirname, 'public')));

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


app.use("/api/data", dataRouter);
app.use("/api/users", usersRouter);
app.use("/api/probes", probesRouter);

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/views', 'login.html'));
});

module.exports = app;
