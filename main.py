from flask import Flask, request, jsonify

from modules import plop
from env import DB_TABLE

import mysql.connector

app = Flask(__name__)


@app.route('/', methods=['POST', 'GET', 'PUT', 'DELETE'])
def query():
    """ handle sql queries """

    try:
        match request.method:
            case 'POST':
                """ request body : {"temperature":, "humidite": } """

                temperature = request.json.get('temperature')
                humidite = request.json.get('humidite')

                plop.create(DB_TABLE, temperature, humidite)
                return jsonify({"result": "1"}), 201

            case 'GET':
                """ request body : {"item_id":, "key": } """

                item_id = request.json.get("item_id")
                key = request.json.get('key')

                result = plop.read(DB_TABLE, item_id, key)
                return jsonify({"result": result}), 200

            case 'PUT':
                """ request body : {"item_id":, "key":, "value": } """

                item_id = request.json.get('item_id')
                key = request.json.get('key')
                value = request.json.get('value')

                plop.update(DB_TABLE, item_id, key, value)
                return jsonify({"result": "1"}), 200

            case 'DELETE':
                """ request body : {"item_id": } """

                item_id = request.json.get('item_id')

                plop.delete(DB_TABLE, item_id)
                return jsonify({"result": "1"}), 201
            
    except mysql.connector.Error as err:
        return jsonify({"error": str(err)}), 500


if __name__ == "__main__":
    app.run(debug=True)
