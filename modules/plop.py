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
    CREATE TABLE IF NOT EXISTS {table} (
        id INT AUTO_INCREMENT PRIMARY KEY,
        temperature FLOAT,
        humidite FLOAT);
    """
    cursor.execute(query)
    db.commit()

    query = f"INSERT INTO {table} (temperature, humidite) VALUES (%s, %s);"

    values = (temperature, humidite)

    cursor.execute(query, values)
    db.commit()

    cursor.close()


def read_all(table):
    '''Read all entries in the database.'''

    cursor = db.cursor()

    query = f"SELECT * FROM {table};"

    cursor.execute(query)

    data = cursor.fetchall()
    cursor.close()
    return data


def read_last(table):
    '''Read the last entry in the database.'''

    cursor = db.cursor()

    query = f"SELECT * FROM {table} ORDER BY id DESC LIMIT 1;"

    cursor.execute(query)

    data = cursor.fetchall()
    cursor.close()
    return data


def update(table, item_id, key, value):
    '''Update an entry in the database.'''

    cursor = db.cursor()

    query = f"UPDATE {table} SET {key} = {value} WHERE id = {item_id};"

    cursor.execute(query)
    db.commit()

    cursor.close()


def update_probe(table, item_id, location):
    '''Update or create an entry in the probes database.'''

    cursor = db.cursor()

    query = f"""
    CREATE TABLE IF NOT EXISTS {table} (
        id INT PRIMARY KEY,
        location VARCHAR(100));
    """
    cursor.execute(query)
    db.commit()

    query = f"""
        INSERT INTO {table} (id, location) VALUES (%s, %s)
        ON DUPLICATE KEY UPDATE location = VALUES (location);
        """
    
    values = (item_id, location)

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
