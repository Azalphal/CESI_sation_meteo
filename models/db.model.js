const mysql = require('mysql2/promise');

// Database connection.
const pool = mysql.createPool({
    host: /*process.env.DB_HOST*/'localhost',
    user: /*process.env.DB_USERNAME*/'root',
    password: /*process.env.DB_PASSWORD*/'root',
    database: /*process.env.DB_DATABASE*/'Weather_Station',
    port: /*process.env.DB_PORT*/3306,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

//pool.query = util.promisify(pool.query);

const checkIfNew = async () => {

    //const createConnection = util.promisify(mysql.createConnection);

    const con = await pool.getConnection();

    try {
        await con.query(`USE Weather_Station`);
    } catch (err) {
        console.log('Database does not exist. Creating it.');

        await pool.query(`CREATE DATABASE IF NOT EXIST Station_Meteo`);
        await pool.query(`USE Station_Meteo`);

    } finally {
        await con.release();
    }
};

const initDatabase = async () => {

    console.log('Initializing the database.');

    try {
        await checkIfNew();

        const connection = await pool.getConnection();
        console.log('Connected to the database.');

        await connection.query(`CREATE TABLE IF NOT EXISTS probe
                                (
                                    id   INT AUTO_INCREMENT PRIMARY KEY,
                                    name VARCHAR(255) NOT NULL
                                )`);
        console.log('The sonde table was created or already existed.');

        await connection.query(`CREATE TABLE IF NOT EXISTS data
                                (
                                    id          INT AUTO_INCREMENT PRIMARY KEY,
                                    humidity    INT          NOT NULL,
                                    temperature INT          NOT NULL,
                                    position    VARCHAR(255) NOT NULL,
                                    date        datetime     NOT NULL
                                )`);
        console.log('The releves table was created or already existed.');

        await connection.query(`CREATE TABLE IF NOT EXISTS users
                                (
                                    id       INT AUTO_INCREMENT PRIMARY KEY,
                                    username VARCHAR(255) NOT NULL,
                                    email    VARCHAR(255) NOT NULL,
                                    password VARCHAR(255) NOT NULL
                                )`);
        console.log('The user table was created or already existed.');

        connection.release();
        console.log('Connection closed successfully');

    } catch (err) {
        console.error('Error initializing database:', err.message);
    }
};

module.exports = {
    pool,
    initDatabase,
};