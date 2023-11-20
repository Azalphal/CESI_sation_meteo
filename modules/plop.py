import mysql.connector

from env import *

db = mysql.connector.connect(host=DB_HOST,
                             user=DB_USER,
                             password=DB_PASSWORD,
                             database=DB_DATABASE)


def create(table, temperature, humidite):

    cursor = db.cursor()

    query = f"""
    CREATE TABLE IF NOT EXISTS %s (
        id INT AUTO_INCREMENT PRIMARY KEY,
        %s FLOAT,
        %s FLOAT);
    """
    cursor.execute(query, (table, temperature, humidite))
    db.commit()

    query = f"INSERT INTO `%s` (`%s`, `%s`) VALUES (%s, %s);"

    cursor.execute(query,
                   (table, temperature, humidite, temperature, humidite))
    db.commit()

    cursor.close()


def read(table, item_id, key):

    cursor = db.cursor()

    query = f"SELECT %s FROM %s WHERE id = %s;"

    cursor.execute(query, (key, table, item_id))

    data = cursor.fetchall()
    cursor.close()
    return str(data)


def update(table, item_id, key, value):

    cursor = db.cursor()

    query = f"UPDATE %s SET %s = %s WHERE id = %s;"

    cursor.execute(query, (table, key, value, item_id))
    db.commit()

    cursor.close()


def delete(table, item_id):

    cursor = db.cursor()

    query = f"DELETE FROM %s WHERE id = %s;"

    cursor.execute(query, (table, item_id))
    db.commit()

    cursor.close()
