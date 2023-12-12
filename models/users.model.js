import {pool} from "./db.model"

// constructor
const Users = function (user) {
    this.username = user.username;
    this.email = user.email;
    this.password = user.password;
};

const validateUsersInput = (newUser) => {
    if (!newUser || typeof newUser !== "object" ||
        !("username" in newUser) ||
        !("email" in newUser) ||
        !("password" in newUser)) {
        throw new Error("Invalid input: Missing required fields.")
    }
    return newUser;
};

Users.create = async (newUser, result) => {
    try {
        const connection = await pool.getConnection();

        const validatedUser = await validateUsersInput(newUser);

        const res = await connection.query(`
                    INSERT INTO users (username, email, password)
                    VALUES (?, ?, ?)`,
            [validatedUser.name, validatedUser.email, validatedUser.password]);

        console.log("Created user: ", {id: res.insertId, ...validatedUser});
        result(null, {id: res.insertId, ...validatedUser});
    } catch (err) {
        console.error("Database error: ", err);
        result({error: "Database error", details: err}, null);
    }
};

Users.findById = async (id, result) => {
    const connection = await pool.getConnection();

    try {
        const validatedId = await validateUsersInput(id);

        const res = await connection.query(`
                    SELECT *
                    FROM users
                    WHERE id = ?`,
            [validatedId]);

        if (res.length !== 0) {
            console.log("Found user: ", res[0]);
            result(null, res[0]);
        } else {
            console.error("User not found for id: ", validatedId);
            result({error: "User not found", details: `No record found for id: ${validatedId}`}, null);
        }
    } catch (err) {
        console.error("Database error: ", err);
        result({error: "Database error", details: err}, null);
    } finally {
        if (connection) {
            connection.release();
        }
    }
};

Users.getAll = async (result) => {
    const connection = await pool.getConnection();

    try {
        const res = await connection.query(`
            SELECT *
            FROM users`);

        console.log("Users: ", res);
        result(null, res);
    } catch (err) {
        console.error("Database error: ", err);
        result({error: "Database error", details: err}, null);
    } finally {
        if (connection) {
            connection.release();
        }
    }
};

Users.updateById = async (id, name, email, password, result) => {
    const connection = await pool.getConnection();

    try {
        const validatedId = await validateUsersInput(id);
        const validatedName = await validateUsersInput(name);
        const validatedEmail = await validateUsersInput(email);
        const validatedPassword = await validateUsersInput(password);

        let changeName, changeEmail, changePassword;

        let sql = `UPDATE users SET `;

        if (validatedName) { sql += `name = ? `; changeName = 1; }
        if (validatedEmail) { sql += `email = ? `; changeEmail = 1; }
        if (validatedPassword) { sql += `password = ? `; changePassword = 1; }

        sql += `WHERE id = ?`;

        const res = await connection.query(sql, [validatedId]);

        if (res.affectedRows !== 0) {
            console.log("Updated user: ", res[0]);
            result(null, {id: id, name: name});
        } else {
            console.error("User not found for id: ", validatedId);
            result({error: "User not found", details: `No record found for id: ${validatedId}`}, null);
        }

        console.log("Updated user: ", res);
        result(null, res);
    } catch (err) {
        console.error("Database error: ", err);
        result({error: "Database error", details: err}, null);
    } finally {
        if (connection) {
            connection.release();
        }
    }
};

module.exports = Users;