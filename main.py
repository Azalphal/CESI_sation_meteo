from flask import Flask, request

from modules import plop
from env import DB_TABLE

app = Flask(__name__)


@app.route('/', methods=['POST', 'GET', 'PUT', 'DELETE'])
def query():
    """ handle sql queries """

    match request.method:
        case 'POST':
            """ request body : {"temperature":, "humidite": } """

            temperature = request.json.get('temperature')
            humidite = request.json.get('humidite')

            plop.create(DB_TABLE, temperature, humidite)
            return "1"

        case 'GET':
            """ request body : {"item_id":, "key": } """

            item_id = request.json.get("item_id")
            key = request.json.get('key')

            return plop.read(DB_TABLE, item_id, key)

        case 'PUT':
            """ request body : {"item_id":, "key":, "value": } """

            item_id = request.json.get('item_id')
            key = request.json.get('key')
            value = request.json.get('value')

            plop.update(DB_TABLE, item_id, key, value)
            return "1"

        case 'DELETE':
            """ request body : {"item_id": } """

            item_id = request.json.get('item_id')

            plop.delete(DB_TABLE, item_id)
            return "1"


if __name__ == "__main__":
    app.run(debug=True)
