const express = require('express');
const session = require('express-session');
const crypto = require('crypto');
const path = require('path');

const apiRouter = require('./routes/api');
const authRouter = require('./routes/auth');
const relevesRouter = require('./routes/data.routes')
const ensureAuthenticated = require('./middleware/auth');
const { pool, initDatabase } = require('./models/db.model.js')

const app = express();
const PORT = process.env.PORT || 3000;
//const secretKey = crypto.randomBytes(64).toString('hex'); USE BASIC AUTH : REMEMBER ME

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, 'public')));

app.use(express.json());
//app.use(session({ secret: secretKey, resave: true, saveUninitialized: true })); USE BASIC AUTH : REMEMBER ME

app.use('/auth', authRouter);
app.use('/api', ensureAuthenticated, apiRouter);
app.use('/releves', ensureAuthenticated, apiRouter);

initDatabase();

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'login.html'));
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
