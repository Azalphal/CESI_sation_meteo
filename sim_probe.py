import requests
import time
import random

while True:

    data = {'temperature': random.uniform(-50, 50), 'humidite': random.uniform(0, 100)}

    print(f"""-------
          sending data {data}
          result {requests.post('http://127.0.0.1:5000', json=data)}""")

    time.sleep(5)
