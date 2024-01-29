

import socket
import time
import os


__DIR__ = os.path.dirname(__file__)



payload = (
    "POST /api/meeting_question/get_questions HTTP/1.1\r\n"
    "Accept: application/json, text/plain, */*\r\n"
    "Host: localhost:5173\r\n"
    "Content-Length: 0\r\n"
    "\r\n\r\n"
).encode()



index = 0

for _ in range(1000):
    server = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
    server.connect(("localhost", 5173))

    server.sendall(payload)

    print(server.recv(1024))
    server.close()


    print(index)

    index += 1


    with open(os.path.join(__DIR__, "cache.txt"), 'a', encoding='utf-8')as fa:
        fa.write(f"{time.time()}\n")