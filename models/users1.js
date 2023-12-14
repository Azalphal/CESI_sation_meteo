import {pool} from "./db.model"

// constructor
const Users = function (user) {
    this.username = user.username;
    this.email = user.email;
    this.password = user.password;
};

Users.create = (newUser, result) => {

    pool.getConnection()
        .then((connection) => {
            connection.query(`
                        INSERT INTO users (username, email, password)
                        VALUES (?, ?, ?)`,
                [newUser.name, newUser.email, newUser.password])
                .then((res) => result(null, {id: res.insertId, ...newData}));

            return connection;
        })
        .then((connection) => connection.release())
        .catch((err) => {
            console.error("Database error: ", err);
            result({error: "Database error", details: err}, null);
        });
};

Users.findById = (id, result) => {

    pool.getConnection()
        .then((connection) => {
            connection.query(`
                        SELECT *
                        FROM users
                        WHERE id = ?`,
                [id])
                .then(res => {
                    if (res.length !== 0) {
                        console.log("Found user: ", res[0]);
                        result(null, res[0]);
                    } else {
                        console.error("User not found for id: ", id);
                        result({error: "User not found", details: `No record found for id: ${id}`}, null);
                    }
                });
            return connection;
        })
        .then((connection) => connection.release())
        .catch((err) => {
            console.error("Database error: ", err);
            result({error: "Database error", details: err}, null);
        });
};

Users.getAll = (result) => {

    pool.getConnection()
        .then((connection) => {

            connection.query(`
                SELECT *
                FROM users`
            )
                .then((res) => result(null, res));
        })
        .then((connection) => connection.release())
        .catch((err) => {
            console.error("Database error: ", err);
            result({error: "Database error", details: err}, null);
        });
};

Users.updateById = (id, username, email, password, result) => {

    pool.getConnection()
        .then((connection) => {

            connection.query(`
                        UPDATE users
                        SET username = ?,
                            email    = ?,
                            password = ?
                        WHERE id = ?`,
                [username, email, password, id])
                .then((res) => {
                    if (res.affectedRows !== 0) {
                        console.log("Updated user: ", res[0]);
                        result(null, {id: id, name: name});
                    } else {
                        console.error("User not found for id: ", validatedId);
                        result({error: "User not found", details: `No record found for id: ${validatedId}`}, null);
                    }
                });

            return connection;
        })
        .then((connection) => connection.release())
        .catch((err) => {
            console.error("Database error: ", err);
            result({error: "Database error", details: err}, null);
        });

    /*let changeName, changeEmail, changePassword;

    let sql = `UPDATE users
               SET `;

    if (validatedName) {
        sql += `name = ? `;
        changeName = 1;
    }
    if (validatedEmail) {
        sql += `email = ? `;
        changeEmail = 1;
    }
    if (validatedPassword) {
        sql += `password = ? `;
        changePassword = 1;
    }

    sql += `WHERE id = ?`;*/
};

module.exports = Users;