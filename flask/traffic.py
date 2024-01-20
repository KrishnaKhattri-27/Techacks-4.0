import cv2
import numpy as np
from time import sleep
import requests


def traffic():
    max_cars = 0  # Variable to store the maximum car count

    cap = cv2.VideoCapture('vb.mp4')
    car_cascade = cv2.CascadeClassifier('cars.xml')

    while True:
        ret, frames = cap.read()
        gray = cv2.cvtColor(frames, cv2.COLOR_BGR2GRAY)
        cars = car_cascade.detectMultiScale(gray, 1.1, 9)

        current_cars = len(cars)  # Update the current car count

        if current_cars > max_cars:
            max_cars = current_cars  # Update the max_cars if the current count is greater

        for (x, y, w, h) in cars:
            plate = frames[y:y + h, x:x + w]
            cv2.rectangle(frames, (x, y), (x + w, y + h), (51, 51, 255), 2)
            cv2.rectangle(frames, (x, y - 40), (x + w, y), (51, 51, 255), -2)
            cv2.putText(frames, 'Car', (x, y - 10),
                        cv2.FONT_HERSHEY_SIMPLEX, 0.7, (255, 255, 255), 2)

        lab1 = "Car Count: " + str(current_cars)
        cv2.putText(frames, lab1, (40, 50),
                    cv2.FONT_HERSHEY_SIMPLEX, 1, (147, 20, 255), 3)
        frames = cv2.resize(frames, (600, 400))
        cv2.imshow('Car Detection System', frames)

        if cv2.waitKey(1) & 0xFF == ord('q'):
            break

    print("Maximum Car Count:", max_cars)

    # Perform your traffic related operations here
    body = {
        'number': max_cars
    }
    url = 'http://localhost:8000/api/recieveTrafficNumber'
    response = requests.post(url, json=body)

    if response.status_code == 200:
        print('Traffic Number sent successfully:', response.json())
    else:
        print('Error:', response.status_code, response.text)

    cv2.destroyAllWindows()
    cap.release()
