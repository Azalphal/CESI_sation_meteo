import mysql.connector

from env import *

db = mysql.connector.connect(host=DB_HOST,
                             user=DB_USER,
                             password=DB_PASSWORD,
                             database=DB_DATABASE)


def create(table, temperature, humidite):

    cursor = db.cursor()

    query = f"""
    CREATE TABLE IF NOT EXISTS {table} (
        id INT AUTO_INCREMENT PRIMARY KEY,
        temperature FLOAT,
        humidite FLOAT);
    """
    cursor.execute(query)
    db.commit()

    query = f"INSERT INTO `{table}` (`temperature`, `humidite`) VALUES ({temperature}, {humidite});"

    cursor.execute(query)
    db.commit()

    cursor.close()


def read(table, item_id, key):

    cursor = db.cursor()

    query = f"SELECT {key} FROM {table} WHERE id = {item_id};"

    cursor.execute(query)

    data = cursor.fetchall()
    cursor.close()
    return str(data) 


def update(table, item_id, key, value):

    cursor = db.cursor()

    query = f"UPDATE {table} SET {key} = {value} WHERE id = {item_id};"

    cursor.execute(query)
    db.commit()

    cursor.close()


def delete(table, item_id):

    cursor = db.cursor()

    query = f"DELETE FROM {table} WHERE id = {item_id};"

    cursor.execute(query)
    db.commit()

    cursor.close()
