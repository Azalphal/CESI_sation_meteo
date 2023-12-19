import requests
import time
import random

while True:
    data = {'humidity': random.uniform(0, 100), 'temperature': random.uniform(-50, 50), 'position': f"[{random.uniform(-90, 90)}, {random.uniform(-90, 90)}]", 'pressure': random.uniform(0, 100)}
                                                                                                    # Aix [43.48126872010999, 5.386365955132931]
    print(f"sending data {data}")

    response = requests.post('http://localhost:3000/api/data', json=data)

    # Check the status code and print the description
    if response.status_code in requests.status_codes._codes:
        description = requests.status_codes._codes[response.status_code][0]
        print(f"Status Code: {response.status_code} - {description}")
    else:
        print(f"Status Code: {response.status_code} - Unknown description")

    time.sleep(5)
