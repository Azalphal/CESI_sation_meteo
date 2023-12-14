const express = require('express');
const path = require('path');
const app = express();
const { Sequelize } = require('sequelize');
const config = require('./config/config');
const userRouter = require('./routes/users.routes.js')


// parse application/x-www-form-urlencoded
app.use(express.urlencoded({extended: true}))

// parse application/json
app.use(express.json());

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, 'public')));

const sequelize = new Sequelize(config.development.database, config.development.username, config.development.password, {
    host: config.development.host,
    dialect: config.development.dialect
});

// Test the database connection
sequelize
    .authenticate()
    .then(() => {
        console.log('Database connection has been established successfully.');
    })
    .catch(err => {
        console.error('Unable to connect to the database:', err);
    });

app.use('/api', userRouter);

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'login.html'));
});

module.exports= app;
