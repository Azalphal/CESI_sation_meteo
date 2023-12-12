import {pool} from "./db.model"

// constructor
const Probe = function (probe) {
    this.name = probe.name;
};

const validateProbeInput = (newProbe) => {
    if (!newProbe || typeof newProbe !== "object" ||
        !("name" in newProbe)) {
        throw new Error("Invalid input: Missing required fields.")
    }
    return newProbe;
};

Probe.create = async (newProbe, result) => {
    try {
        const connection = await pool.getConnection();

        const validatedProbe = await validateProbeInput(newProbe);

        const res = await connection.query(`
                    INSERT INTO probe (name)
                    VALUES (?)`,
            [validatedProbe.name]);

        console.log("Created probe: ", {id: res.insertId, ...validatedProbe});
        result(null, {id: res.insertId, ...validatedProbe});
    } catch (err) {
        console.error("Database error: ", err);
        result({error: "Database error", details: err}, null);
    }
};

Probe.findById = async (id, result) => {
    const connection = await pool.getConnection();

    try {
        const validatedId = await validateProbeInput(id);

        const res = await connection.query(`
                    SELECT *
                    FROM probe
                    WHERE id = ?`,
            [validatedId]);

        if (res.length !== 0) {
            console.log("Found probe: ", res[0]);
            result(null, res[0]);
        } else {
            console.error("Probe not found for id: ", validatedId);
            result({error: "Probe not found", details: `No record found for id: ${validatedId}`}, null);
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

Probe.getAll = async (result) => {
    const connection = await pool.getConnection();

    try {
        const res = await connection.query(`
            SELECT *
            FROM probe`);

        console.log("Probe: ", res);
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

Probe.updateById = async (id, name, result) => {
    const connection = await pool.getConnection();

    try {
        const validatedId = await validateProbeInput(id);
        const validateName = await validateProbeInput(name);

        const res = await connection.query(`
                    UPDATE probe
                    SET name = ?
                    WHERE id = ?`,
            [validatedId.id, validateName.name]);

        if (res.affectedRows !== 0) {
            console.log("Updated probe: ", res[0]);
            result(null, {id: id, name: name});
        } else {
            console.error("Probe not found for id: ", validatedId);
            result({error: "Probe not found", details: `No record found for id: ${validatedId}`}, null);
        }

        console.log("Updated probe: ", res);
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

module.exports = Probe;