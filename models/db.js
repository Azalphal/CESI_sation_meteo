const mysql = require('mysql2/promise');
const util = require('util');

const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'Station_Meteo',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

//pool.query = util.promisify(pool.query);


const createDatabase = () => {
    try {
        pool.query(`CREATE DATABASE IF NOT EXIST Station_Meteo`);
        pool.query(`USE Station_Meteo`);
    } catch (err) {
        console.error('Error creating database:', err.message);
    }
}

const checkIfNew = async () => {

    //const createConnection = util.promisify(mysql.createConnection);

    const con = await mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: '',
    });

    try {
        await con.query(`USE Station_Meteo`);
    } catch (err) {
        console.log('Database does not exist. Creating it.');
        await createDatabase();
    } finally {
        con.end();
    }
};

const initDatabase = async () => {

    try {
        await checkIfNew();

        const connection = await pool.getConnection();
        console.log('Connected to the database.');

        console.log('Here?');

        await connection.query(`CREATE TABLE IF NOT EXISTS sonde (
            id INT AUTO_INCREMENT PRIMARY KEY,
            name VARCHAR(255) NOT NULL
        )`);
        console.log('The sonde table was created or already existed.');

        await connection.query(`CREATE TABLE IF NOT EXISTS releves (
            id INT AUTO_INCREMENT PRIMARY KEY,
            humidite INT NOT NULL,
            temperature INT NOT NULL,
            position VARCHAR(255) NOT NULL
        )`);
        console.log('The releves table was created or already existed.');

        await connection.query(`CREATE TABLE IF NOT EXISTS users (
            id INT AUTO_INCREMENT PRIMARY KEY,
            username VARCHAR(255) NOT NULL,
            email VARCHAR(255) NOT NULL,
            password VARCHAR(255) NOT NULL
        )`);
        console.log('The user table was created or already existed.');

        connection.release();
        console.log('Connection closed successfully');

    } catch (err) {
        console.error('Error initializing database:', err.message);
    }
};

const registerUser = async (username, password) => {
    try {

        const [existingUser] = pool.query('SELECT * FROM users WHERE username = ?', [username]);

        if (existingUser.length > 0) {
            throw new Error('Username already exists.');
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        pool.query('INSERT INTO users (username, password) VALUES (?, ?)', [username, hashedPassword]);

        res.status(201).send('User registered successfully');

    } catch (error) {
        console.error('Error registering user:', error);
        throw error;
    }
};

const loginUser = async (username, password) => {
    try {
        const [user] = pool.query('SELECT * FROM users WHERE username = ?', [username]);

        if (user.length === 0 || !(await bcrypt.compare(password, user[0].password))) {
            return { success: false, message: 'Invalid username or password' };
        }

        return { success: true, message: 'Successfully logged in.' };
    } catch (err) {
        console.error(err);
        return { success: false, message: 'An unexpected error occurred while logging you in.' };
    }
};

module.exports = {
    pool,
    initDatabase,
    registerUser,
    loginUser,
};