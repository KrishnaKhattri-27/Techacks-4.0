from deepface import DeepFace
import requests
import cloudinary
import cloudinary.uploader

cloudinary.config(
    cloud_name="dohky5q86",
    api_key="971431767226324",
    api_secret="lZcQav4UbfAHM3M2GbcxZ9YtbdM"
)

result = DeepFace.verify(img1_path='./Images/dhruv3.jpg',
                         img2_path="./Images/dhruv2.jpg")
print(result)
if (result[verified]):
    cloud_result = cloudinary.uploader.upload(
        './Images/dhruv1.jpg', public_id="Dhruv")
    print("Sent Image to Cloudinary")

    secure_url = cloud_result['secure_url']
    print(secure_url)
    body = {
        'name': "Dhruv",
        'photo': secure_url,
        'personal': {
            'age': 21,
            'gender': "Male"
        },
        'history': 'Found guilty for looking Hot'


    }
    url = 'http://localhost:8000/api/recievePrisoner'
    response = requests.post(url, json=body)

    if response.status_code == 200:
        print('Image sent successfully:', response.json())
    else:
        print('Error:', response.status_code, response.text)
