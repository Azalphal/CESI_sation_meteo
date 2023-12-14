const express = require("express");
const path = require("path");
const app = express();


const authRouter = require("./routes/auth");
const dataRouter = require("./routes/data.routes");
const usersRouter = require("./routes/users.routes");

const ensureAuthenticated = require("./middleware/auth");
//const {initDatabase} = require("./models/db.model.js");
const {Sequelize} = require("sequelize");
const config = require("./config/config");

const PORT = process.env.PORT || 3000;

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

app.use('/api', usersRouter);

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'login.html'));
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

module.exports = app;
