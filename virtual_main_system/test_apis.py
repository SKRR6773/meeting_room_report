import requests



with requests.Session()as session:

    while True:
        with session.post("http://192.168.88.122:5173/api/meeting_hooks/push", json={
            "name": "",
        })as req:
            print(req.json())