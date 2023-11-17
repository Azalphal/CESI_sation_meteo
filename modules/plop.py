import mysql.connector

from env import *

db = mysql.connector.connect(host=DB_HOST,
                             user=DB_USER,
                             password=DB_PASSWORD,
                             database=DB_DATABASE)

# Creation d'un objet curseur permettant d'executer des requetes SQL
cursor = db.cursor()


def create(table, temperature, humidite):

    query = f"""
    CREATE TABLE IF NOT EXISTS {table} (
        id INT AUTO_INCREMENT PRIMARY KEY,
        temperature FLOAT,
        humidite FLOAT
    );
    INSERT INTO {table} (temperature, humidite) VALUES ({temperature}, {humidite});
    """
    cursor.execute(query)


def read(table, item_id, key):

    query = f"SELECT {key} FROM {table} WHERE id = {item_id};"
    cursor.execute(query)
    return 1 ############## return resultat


def update(table, item_id, key, value):

    query = f"UPDATE {table} SET {key} = {value} WHERE id = {item_id};"
    cursor.execute(query)


def delete(table, item_id):

    query = f"DELETE FROM {table} WHERE id = {item_id};"
    cursor.execute(query)
