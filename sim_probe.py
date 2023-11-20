import requests
import time
import random

while True:

    data = {'temperature': random.uniform(-50, 50), 'humidite': random.uniform(0, 100)}

    print(f"""-------
          sending data {data}
          result {requests.post('localhost', json=data)}""")

    time.sleep(5)
