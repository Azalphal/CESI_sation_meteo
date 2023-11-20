from flask import Flask, request, jsonify

from modules import plop
from env import DB_TABLE

import mysql.connector

app = Flask(__name__)


@app.route('/api', methods=['POST', 'GET', 'PUT', 'DELETE'])
def query():
    """ handle sql queries """

    try:
        match request.method:
            case 'POST':
                """Create a new entry in the database. \n request body : {"temperature":, "humidite": } """

                temperature = request.json.get('temperature')
                humidite = request.json.get('humidite')

                plop.create(DB_TABLE, temperature, humidite)
                return jsonify({"result": "Record created successfully."}), 201

            case 'GET':
                """Read an entry in the database. \n request body : {"item_id":, "key": } """

                item_id = request.json.get("item_id")
                key = request.json.get('key')

                result = plop.read(DB_TABLE, item_id, key)
                return jsonify({"result": result}), 200

            case 'PUT':
                """Update an entry in the database. \n request body : {"item_id":, "key":, "value": } """

                item_id = request.json.get('item_id')
                key = request.json.get('key')
                value = request.json.get('value')

                plop.update(DB_TABLE, item_id, key, value)
                return jsonify({"result": "Record updated successfully."}), 200

            case 'DELETE':
                """Delete an entry in the database. \n request body : {"item_id": } """

                item_id = request.json.get('item_id')

                plop.delete(DB_TABLE, item_id)
                return jsonify({"result": "Record deleted successfully."}), 201

    except mysql.connector.Error as err:
        return jsonify({"error": str(err)}), 500


if __name__ == "__main__":
    app.run(debug=True)
