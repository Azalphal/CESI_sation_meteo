from flask import Flask, request, jsonify
from env import *

import mysql.connector
import json

app = Flask(__name__)

# Identifiants de connections pour la BDD
db = mysql.connector.connect(
    host=DB_HOST,
    user=DB_USER,
    password=   DB_PASSWORD,
    database=DB_DATABASE
)

# Creation d'un objet curseur permettant d'executer des requetes SQL
cursor = db.cursor()

# example data: from get request / for post request #########test
data = {"id"   : "1234",
        "temperature": "25.665",
        "humidite": "1.626"}


@app.route('/', methods=['GET'])  
# @ =décorateur de fct, endpoint api(url)
def get_value():
    ''' request body : {"id" : id, "key" : key} '''

    item_id = request.form["id"]
    key = request.form["key"]

    # sql request: get value of [key] from  item with id [item_id]
    value = 0

    return value


@app.route('/', methods=['POST'])
def post():
    ''' request body : {"temperature" : tvalue, "humidite" : hvalue} '''

    temperature = request.form["temperature"]
    humidite = request.form["humidite"]

    # f"INSERT INTO table (temperature, humidite) VALUES ({temperature}, {humidite});"
    # (id should auto increment)


@app.route('/', methods=['DELETE'])
def delete():
    ''' request body : {"id" : id} '''

    item_id = request.form["id"]
    # sql request: remove item with id [item_id] from table


if __name__ == "__main__":
    app.run(debug=True)
