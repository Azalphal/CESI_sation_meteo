def insert(type, value):
  


# def post():
#     '''
#     '''
    
    # hire_start = datetime.date(1999, 1, 1)
    # hire_end = datetime.date(1999, 12, 31)

    # cursor.execute(query, (hire_start, hire_end))
    
    # f' 
    # INSERT INTO historique (type, date, value)
    # VALUES (?, NOW(), ?);', [type, value])
    # INSERT INTO table (temperature, humidite) VALUES ({temperature}, {humidite});"

def get_value():
    ''' request body : {"id" : id, "key" : key} '''

    item_id = request.form["id"]
    key = request.form["key"]

    # sql request: get value of [key] from  item with id [item_id]
    query = f"SELECT {key} FROM {table} WHERE id = {item_id};"
    #cursor.execute(query)

    value = 0

    return value


@app.route('/', methods=['POST'])
def post():
    ''' request body : {"temperature" : tvalue, "humidite" : hvalue} '''

    temperature = request.form["temperature"]
    humidite = request.form["humidite"]

    query = f"INSERT INTO table (temperature, humidite) VALUES ({temperature}, {humidite});"
    # (id should auto increment)
    #cursor.execute(query)


@app.route('/', methods=['DELETE'])
def delete():
    ''' request body : {"id" : id} '''

    item_id = request.form["id"]
    # sql request: remove item with id [item_id] from table
    query = f"DELETE FROM {table} WHERE id = {item_id};"
    #cursor.execute(query)
