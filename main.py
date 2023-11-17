from flask import Flask, request

from modules import plop

app = Flask(__name__)


@app.route('/', methods=['POST', 'GET', 'PUT', 'DELETE'])
def query():

    match request.method:
        case 'POST':

            temperature = request.form.get('temperature')
            humidite = request.form.get('humidite')

            plop.create(DB_TABLE, temperature, humidite)

        case 'GET':

            item_id = request.form.get('item_id')
            key = request.form.get('key')

            return plop.read(DB_TABLE, item_id, key)

        case 'PUT':

            item_id = request.form.get('item_id')
            key = request.form.get('key')
            value = request.form.get('value')

            plop.update(DB_TABLE, item_id, key, value)

        case 'DELETE':

            item_id = request.form.get('item_id')

            plop.delete(DB_TABLE, item_id)


if __name__ == "__main__":
    app.run(debug=True)
