import mysql.connector

from env import *

db = mysql.connector.connect(host=DB_HOST,
                             user=DB_USER,
                             password=DB_PASSWORD,
                             database=DB_DATABASE)


def create(table, temperature, humidite):
    '''Create a new entry in the database.'''
    cursor = db.cursor()

    query = f"""
    CREATE TABLE IF NOT EXISTS %s (
        id INT AUTO_INCREMENT PRIMARY KEY,
        temperature FLOAT,
        humidite FLOAT);
    """
    cursor.execute(query, (table))
    db.commit()

    query = f"INSERT INTO %s (temperature, humidite) VALUES (%s, %s);"

    values = (table, temperature, humidite)

    cursor.execute(query, values)
    db.commit()

    cursor.close()


def read(key, table, item_id):
    '''Read an entry in the database.'''
    cursor = db.cursor()

    query = f"SELECT %s FROM %s WHERE id = %s;"

    values = (key, table, item_id)

    cursor.execute(query, values)

    data = cursor.fetchall()
    cursor.close()
    return str(data)


def update(table, item_id, key, value):
    '''Update an entry in the database.'''

    cursor = db.cursor()

    query = f"UPDATE %s SET %s = %s WHERE id = %s;"

    values = (table, key, value, item_id)

    cursor.execute(query, values)
    db.commit()

    cursor.close()


def delete(table, item_id):
    '''Delete an entry in the database.'''

    cursor = db.cursor()

    query = f"DELETE FROM %s WHERE id = %s;"

    values = (table, item_id)

    cursor.execute(query, values)
    db.commit()

    cursor.close()
