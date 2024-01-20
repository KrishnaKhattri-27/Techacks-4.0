import cv2
from deepface import DeepFace
import requests
import cloudinary
import cloudinary.uploader


def capture_and_verify():

    cloudinary.config(
        cloud_name="dohky5q86",
        api_key="971431767226324",
        api_secret="lZcQav4UbfAHM3M2GbcxZ9YtbdM"
    )
    flag = 1

    cap = cv2.VideoCapture(0)

    while True:
        ret, frame = cap.read()

        try:
            result = DeepFace.verify(
                img1_path='./Images/dhruv3.jpg', img2_path=frame)
        except ValueError as e:
            # print(f"Error: {e}")
            continue

        print("Face verification result:", result)

        if result['verified']:
            cv2.imwrite("captured_image.jpg", frame)

            cloud_result = cloudinary.uploader.upload(
                'captured_image.jpg', public_id="Dhruv")
            print("Sent Image to Cloudinary")

            secure_url = cloud_result['secure_url']
            print(secure_url)
            body = {
                'name': "Dhruv",
                'photo': secure_url,
                'age': 21,
                'gender': "Male",
                'history': 'Found guilty for looking Hot'
            }

            url = 'http://localhost:5000/api/recievePrisoner'
            response = requests.post(url, json=body)

            if response.status_code == 200:
                print('Image sent successfully:', response.json())
                flag = 0
                exit()
            else:
                print('Error:', response.status_code, response.text)
                flag = 0
                exit()

        cv2.imshow("Face", frame)

    cap.release()
    cv2.destroyAllWindows()
