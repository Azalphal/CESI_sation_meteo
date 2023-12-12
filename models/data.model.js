import {pool} from "./db.model"

// constructor
const Data = function (data) {
    this.humidity = data.humidity;
    this.temperature = data.temperature;
    this.position = data.position;
};

const validateDataInput = (newData) => {
    if (!newData || typeof newData !== "object" ||
        !("humidity" in newData) ||
        !("temperature" in newData) ||
        !("position" in newData)) {
        throw new Error("Invalid input: Missing required fields.")
    }
    return newData;
};

Data.create = async (newData, result) => {
    try {
        const connection = await pool.getConnection();

        const validatedData = await validateDataInput(newData);

        const res = await connection.query(`
                    INSERT INTO data (humidity, temperature, position)
                    VALUES (?, ?, ?)`,
            [validatedData.humidite, validatedData.temperature, validatedData.position]);

        console.log("Created data: ", {id: res.insertId, ...validatedData});
        result(null, {id: res.insertId, ...validatedData});
    } catch (err) {
        console.error("Database error: ", err);
        result({error: "Database error", details: err}, null);
    }
};

Data.findById = async (id, result) => {
    const connection = await pool.getConnection();

    try {
        const validatedId = await validateDataInput(id);

        const res = await connection.query(`
                    SELECT *
                    FROM data
                    WHERE id = ?`,
            [validatedId]);

        if (res.length !== 0) {
            console.log("Found data: ", res[0]);
            result(null, res[0]);
        } else {
            console.error("Data not found for id: ", validatedId);
            result({error: "Data not found", details: `No record found for id: ${validatedId}`}, null);
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

Data.getAll = async (date, result) => {
    const connection = await pool.getConnection();

    try {
        const validatedDate = await validateDataInput(date);

        let sql = `
            SELECT *
            FROM data`;

        if (validatedDate) sql += ` WHERE date LIKE ?`;

        const res = await connection.query(sql, [validatedDate]);

        console.log("Data: ", res);
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

module.exports = Data;