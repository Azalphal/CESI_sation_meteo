from flask import Flask, request, jsonify, render_template
from flask_cors import CORS

from modules import plop
from env import DB_TABLE

import mysql.connector

app = Flask(__name__)
CORS(app)


@app.route('/')
def display_html():
    return render_template("index.html")


@app.route('/api/fetch_all', methods=['GET'])
def fetch_all():
    '''Read all entries in the database.'''

    result = plop.read_all(DB_TABLE)
    return jsonify(result), 200


@app.route('/api/fetch_last', methods=['GET'])
def fetch_last():
    '''Read the last entry in the database.'''

    result = plop.read_last(DB_TABLE)[0]

    result = jsonify({"temperature" : result[1], "humidite" : result[2]})

    return result, 200


@app.route('/api', methods=['POST', 'GET', 'PUT', 'DELETE'])
def query():
    """ handle http requests, call plop for sql queries """

    try:
        match request.method:
            case 'POST':
                """Create a new entry in the database. \n request body : {"temperature":, "humidite": } """

                temperature = request.json.get('temperature')
                humidite = request.json.get('humidite')

                plop.create(DB_TABLE, temperature, humidite)
                return jsonify({"result": "Record created successfully."}), 201

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
    
    return render_template("test.html")


if __name__ == "__main__":
    app.run(debug=True)
